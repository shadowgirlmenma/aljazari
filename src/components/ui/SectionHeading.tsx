export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'dark' | 'light';
}) {
  const isDark = tone === 'dark';
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p
          className={`font-mono text-[11px] tracking-[0.25em] uppercase ${
            isDark ? 'text-brand-600' : 'text-brand-300'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
          isDark ? 'text-ink' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 leading-relaxed ${isDark ? 'text-ink/70' : 'text-brand-100/85'}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
