/**
 * كل نماذج الموقع العامة (تواصل معنا، حجز روبوت، التسجيل كمدرّب، التسجيل
 * بدورة، الاشتراك بالنشرة) لا تتصل بأي باكند أو تخزّن أي بيانات — الزر يبني
 * رابط mailto: يحتوي كل الحقول اللي كتبها الزائر نصاً واضحاً (تسمية: قيمة)،
 * ويفتح تطبيق البريد (Gmail أو أي تطبيق بريد افتراضي بالجهاز) معبّى مسبقاً،
 * وبيد الزائر تكون الخطوة الأخيرة (الضغط على إرسال داخل تطبيق البريد).
 *
 * هذا قرار أمني/خصوصية مقصود: الموقع الأمامي (frontend) ما يخزّن ولا يرسل
 * أي بيانات شخصية لأي خادم — فما اكو سطح هجوم لتسريب بيانات الزوار من هذا
 * الجزء من الموقع.
 */

export const CONTACT_EMAIL = 'info@aljazari.iq';

/**
 * يبني رابط mailto: بعنوان وجسم رسالة مرتّب سطر لكل حقل بصيغة "التسمية: القيمة".
 * يتجاهل الحقول الفاضية تلقائياً.
 */
export function buildMailto(
  subject: string,
  fields: Array<[label: string, value: string | undefined | null]>,
  email: string = CONTACT_EMAIL,
): string {
  const body = fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
