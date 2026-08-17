/**
 * شبكة أفق بمنظور ثلاثي الأبعاد — بديل خفيف (CSS فقط، بدون WebGL) لتأثير
 * "Perspective Grid" — خطوط بنفسجية متحركة بعمق، تعطي إحساس تقني/مستقبلي
 * بدون أي تحميل إضافي على الصفحة. حطيها كخلفية absolute داخل قسم
 * position:relative + overflow-hidden، والمحتوى فوقها بـ class="relative z-10".
 */
export default function PerspectiveGrid({
  opacity = 0.5,
  fadeTop = true,
}: {
  opacity?: number;
  fadeTop?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ perspective: '400px', opacity }}
    >
      <div
        className="perspective-grid__floor absolute inset-x-[-50%] bottom-0 h-[140%]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,165,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,255,0.35) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          transform: 'rotateX(78deg)',
          transformOrigin: 'bottom center',
        }}
      />
      {fadeTop && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #0a0414 0%, rgba(10,4,20,0) 35%, rgba(10,4,20,0) 65%, #0a0414 100%)',
          }}
        />
      )}
    </div>
  );
}
