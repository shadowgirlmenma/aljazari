export default function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // عرض موحّد لكل الأقسام + هوامش تكبر مع حجم الشاشة
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
