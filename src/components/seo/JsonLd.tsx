/**
 * يطبع بيانات schema.org (JSON-LD) داخل <script> بالصفحة.
 * نهرب "<" احتياطاً حتى ما ينكسر الـ <script> ولا ينحقن HTML جواه لو صار
 * النص بيوم من حقل قابل للتعديل.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
