export default function DetailField({
  label, value, href, dir,
}: {
  label: string;
  value: string | null | undefined;
  href?: string;
  dir?: 'ltr' | 'rtl';
}) {
  if (!value) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400/50">{label}</p>
      {href ? (
        <a href={href} dir={dir} className="mt-0.5 block text-sm text-purple-100 transition hover:text-purple-300">
          {value}
        </a>
      ) : (
        <p dir={dir} className="mt-0.5 text-sm text-purple-100">{value}</p>
      )}
    </div>
  );
}