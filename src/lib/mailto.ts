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

/**
 * يفتح شاشة كتابة رسالة جاهزة ومعبّأة بكل الحقول إلى بريد الشركة:
 * - على الكمبيوتر: صفحة Gmail (compose) بتبويب جديد.
 * - على الموبايل: تطبيق البريد الافتراضي (mailto:) لأن Gmail web ما يشتغل ممتاز هناك.
 * - إذا المتصفح منع النافذة الجديدة: نرجع لـ mailto: كخطة بديلة.
 * الصيغة (سطر لكل حقل "التسمية: القيمة") موحّدة لكل نماذج الموقع.
 */
export function openMail(
  subject: string,
  fields: Array<[label: string, value: string | undefined | null]>,
  email: string = CONTACT_EMAIL,
): void {
  const mailto = buildMailto(subject, fields, email);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = mailto;
    return;
  }
  const body = fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  const gmail =
    'https://mail.google.com/mail/?view=cm&fs=1' +
    `&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  const w = window.open(gmail, '_blank');
  if (w) w.opener = null;
  else window.location.href = mailto;
}
