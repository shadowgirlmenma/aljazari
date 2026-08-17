import DotGrid from './DotGrid';

/**
 * غلاف جاهز لاستخدام DotGrid كخلفية خفيفة داخل أي قسم.
 * حطيه كأول عنصر داخل section عندها position:relative + overflow-hidden،
 * وحطي على المحتوى اللي بعدها class="relative z-10".
 * فيها تعتيم تدريجي بالحواف (mask) حتى ما تبين حواف الشبكة بشكل مقطوع.
 */
export default function DotGridBackdrop({
  opacity = 0.5,
}: {
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        maskImage:
          'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 85%)',
      }}
    >
      <DotGrid
        dotSize={3}
        gap={26}
        baseColor="#3a1260"
        activeColor="#c4a5ff"
        proximity={130}
        shockRadius={200}
        shockStrength={2.5}
        opacity={opacity}
      />
    </div>
  );
}
