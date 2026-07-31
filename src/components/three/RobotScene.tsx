'use client';

/**
 * روبوت NEXBOT — موديل GLB (nexbot.glb)
 * الموديل لازم يكون موجود بمسار: public/models/nexbot.glb
 *
 * ⚠️ ملاحظتان مهمتان اكتشفتهم بالفحص:
 * 1) الملف صفر materials وصفر textures — Spline صدّرته بدون أي لون/معدن
 *    (الشيدرز اللي تشوفينها بمحرر Spline خاصة بيه وما تصدّر لـ GLB قياسي).
 *    لهذا نعطي المواد يدوياً بالكود: أسود لماع للجسم + فضي معدني للمفاصل.
 * 2) الملف ما فيه Animation Clips مدمجة — الأنيميشن (دوران الرأس، تمايل
 *    الذراعين، التنفّس) مبرمج يدوياً بالكود لأن القطع منفصلة ومسمّاة.
 *
 * الكاميرا تحسب مسافتها تلقائياً حسب طول الروبوت الفعلي بعد التحجيم،
 * حتى الجسم كامل يبين بالإطار (رأس لرجلين) بدون قص، بغض النظر عن التغيير
 * بـ TARGET_SIZE أو نسبة عرض/ارتفاع الحاوية.
 */

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, ContactShadows, Environment } from '@react-three/drei';
import {
  Box3,
  Euler,
  Vector3,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  type Group,
  type Object3D,
  type Mesh,
} from 'three';

const MODEL_PATH = '/models/nexbot.glb';

// حجم مرجعي للروبوت بوحدات المشهد (يتحكم بحجمه النسبي وسرعة حركاته)
const TARGET_SIZE = 3.2;
// هامش التأطير: أصغر = الروبوت يطلع أكبر (كاميرا أقرب) — أكبر = مسافة أوسع حوله
const FRAME_MARGIN = 1.3;

const ANIMATED_PARTS = ['Head', 'Neck', 'arm', 'forearm', 'Hand', 'femur', 'shin', 'Body'] as const;
type PartEntry = { obj: Object3D; base: Euler };
type PartsMap = Partial<Record<(typeof ANIMATED_PARTS)[number], PartEntry[]>>;

// أسود لماع للألواح الكبيرة بالجسم
const BODY_MATERIAL = new MeshPhysicalMaterial({
  color: '#111015',
  metalness: 0.35,
  roughness: 0.32,
  clearcoat: 0.7,
  clearcoatRoughness: 0.15,
});

// فضي معدني للمفاصل والقطع الصغيرة (الأسماء العامة مثل Cylinder/elbow/Rectangle...)
const JOINT_MATERIAL = new MeshStandardMaterial({
  color: '#c9cad2',
  metalness: 0.9,
  roughness: 0.22,
});

const JOINT_NAME_PATTERN = /cylinder|elbow|neck|pelvic|rectangle|ellipse|cube|group/i;

function NexbotModel({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null!);
  const inner = useRef<Group>(null!);
  const parts = useRef<PartsMap>({});
  const { scene } = useGLTF(MODEL_PATH);
  const { camera } = useThree();

  useEffect(() => {
    if (!inner.current) return;

    // 1) توزيع المواد — الملف نزل بدون أي مادة أصلاً
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      mesh.material = JOINT_NAME_PATTERN.test(obj.name) ? JOINT_MATERIAL : BODY_MATERIAL;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    // 2) تطبيع الحجم حسب الأبعاد الحقيقية للموديل
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = TARGET_SIZE / maxDim;
    inner.current.scale.setScalar(scale);

    const center = new Vector3();
    box.getCenter(center);
    inner.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    // 3) الكاميرا تتباعد تلقائياً حسب الطول الفعلي (بعد التحجيم) — يضمن
    //    ظهور الروبوت كامل من الرأس للرجلين مهما كانت نسبة الحاوية
    const scaledHeight = size.y * scale;
    const scaledWidth = size.x * scale;
    const persp = camera as unknown as { fov: number; aspect: number };
    const vFovRad = (persp.fov * Math.PI) / 180;
    const distanceForHeight = scaledHeight / 2 / Math.tan(vFovRad / 2);
    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * persp.aspect);
    const distanceForWidth = scaledWidth / 2 / Math.tan(hFovRad / 2);
    const distance = Math.max(distanceForHeight, distanceForWidth) * FRAME_MARGIN;

    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    if ('updateProjectionMatrix' in camera) {
      (camera as unknown as { updateProjectionMatrix: () => void }).updateProjectionMatrix();
    }

    // 4) نجمع القطع المطلوب تحريكها ونحفظ وضعيتها الأصلية
    const found: PartsMap = {};
    scene.traverse((obj) => {
      if ((ANIMATED_PARTS as readonly string[]).includes(obj.name)) {
        const key = obj.name as (typeof ANIMATED_PARTS)[number];
        (found[key] ??= []).push({ obj, base: obj.rotation.clone() });
      }
    });
    parts.current = found;
  }, [scene, camera]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (animate && group.current) {
      group.current.rotation.y = pointer.x * 0.3 + Math.sin(t * 0.4) * 0.05;
      group.current.rotation.x = -pointer.y * 0.15 + Math.sin(t * 0.3) * 0.03;
    }

    if (!animate) return;
    const p = parts.current;

    p.Head?.forEach(({ obj, base }) => {
      obj.rotation.y = base.y + Math.sin(t * 0.6) * 0.12;
      obj.rotation.x = base.x + Math.sin(t * 0.5 + 1) * 0.04;
    });
    p.Neck?.forEach(({ obj, base }) => {
      obj.rotation.y = base.y + Math.sin(t * 0.6) * 0.06;
    });
    p.arm?.forEach(({ obj, base }, i) => {
      obj.rotation.z = base.z + Math.sin(t * 0.9 + i * Math.PI) * 0.08 * (i % 2 === 0 ? 1 : -1);
    });
    p.forearm?.forEach(({ obj, base }, i) => {
      obj.rotation.x = base.x + Math.sin(t * 0.9 + i * Math.PI + 0.5) * 0.06;
    });
    p.Hand?.forEach(({ obj, base }, i) => {
      obj.rotation.z = base.z + Math.sin(t * 1.1 + i * Math.PI) * 0.04;
    });
    p.femur?.forEach(({ obj, base }, i) => {
      obj.rotation.x = base.x + Math.sin(t * 0.5 + i * Math.PI) * 0.02;
    });
    p.Body?.forEach(({ obj }) => {
      const breathe = 1 + Math.sin(t * 0.8) * 0.015;
      obj.scale.set(breathe, breathe, breathe);
    });
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.25}>
        <group ref={inner}>
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

export default function RobotScene({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.2, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 3]} intensity={1.3} castShadow />
      <pointLight position={[-1.6, 1.4, 2]} intensity={6} color="#7C3AED" distance={8} />
      <pointLight position={[1.8, 1.0, 1.5]} intensity={4.5} color="#4F46E5" distance={8} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <NexbotModel animate={animate} />
      </Suspense>

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.45} scale={7} blur={2.5} far={3}
        color="#3B0764"
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);