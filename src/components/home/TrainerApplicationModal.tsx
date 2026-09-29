'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { X, CheckCircle, Paperclip } from 'lucide-react';
import PhoneInput from '@/components/ui/PhoneInput';
import { openMail } from '@/lib/mailto';

/**
 * ملاحظة 29/09/2026: المستخدمة طلبت تقييد "طلب مدرّب" برفع ملفات — نوع
 * الملفات PDF أو PNG أو JPG فقط، حتى 3 ملفات، وملف واحد إجباري على الأقل.
 * لكن هذا الفورم (متل كل فورمات الموقع) يشتغل بدون باكند عبر mailto: —
 * وmailto: قيد تقني بكل المتصفحات ما يدعم إرفاق ملفات فعلياً بالرسالة.
 * لذلك: نتحقق من نوع/عدد الملفات هنا بالواجهة، ونذكر أسماءها بنص الرسالة
 * الجاهزة، وبعد ما يفتح تطبيق البريد نعرض تذكير واضح للمتقدّمة حتى ترفق
 * الملفات يدوياً قبل الضغط على إرسال (شوفي شاشة "sent" أدناه).
 */
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const ALLOWED_LABEL = 'PDF أو PNG أو JPG';
const MAX_FILES = 3;

export default function TrainerApplicationModal({
  open, onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: '', email: '', phone: '', specialty: '', experience: '',
  });
  const [cvFiles, setCvFiles] = useState<File[]>([]);

  const errors = {
    name: form.name.length > 0 && form.name.trim().length < 2,
    email: form.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    specialty: form.specialty.length > 0 && form.specialty.trim().length < 2,
    experience: form.experience.length > 0 && form.experience.trim().length < 10,
  };

  const markTouched = (f: string) => setTouched((t) => ({ ...t, [f]: true }));

  const handleFilesSelected = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    const incoming = Array.from(selected);
    const valid: File[] = [];
    const rejected: string[] = [];
    for (const file of incoming) {
      if (ALLOWED_TYPES.includes(file.type)) valid.push(file);
      else rejected.push(file.name);
    }
    if (rejected.length > 0) {
      toast.error(`صيغة غير مدعومة (${ALLOWED_LABEL} فقط): ${rejected.join('، ')}`);
    }
    setCvFiles((prev) => {
      const merged = [...prev, ...valid];
      if (merged.length > MAX_FILES) {
        toast.error(`الحد الأقصى ${MAX_FILES} ملفات — تم تجاهل الباقي`);
      }
      return merged.slice(0, MAX_FILES);
    });
  };

  const removeFile = (index: number) => setCvFiles((prev) => prev.filter((_, i) => i !== index));

  const reset = () => {
    setSent(false);
    setForm({ name: '', email: '', phone: '', specialty: '', experience: '' });
    setTouched({});
    setCvFiles([]);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneValid) { toast.error('رقم الهاتف غير مكتمل'); return; }
    if (errors.name || errors.email || errors.specialty || errors.experience) {
      toast.error('راجعي الحقول المظلّلة بالأحمر');
      return;
    }
    if (!form.name || !form.email || !form.specialty || !form.experience) {
      toast.error('عبّي كل الحقول المطلوبة');
      return;
    }
    if (cvFiles.length === 0) {
      toast.error(`ارفقي ملف واحد على الأقل (${ALLOWED_LABEL})`);
      return;
    }

    /* بدون أي ربط بباكند — يفتح صفحة Gmail (أو تطبيق البريد بالموبايل)، معبّى
       تلقائياً بكل الحقول اللي كتبها المتقدّم نصاً واضحاً، بما فيها أسماء
       الملفات المختارة (يرجى إرفاقها يدوياً — راجعي الملاحظة أعلاه). */
    openMail('طلب انضمام كمدرّب', [
      ['الاسم', form.name],
      ['البريد الإلكتروني', form.email],
      ['الهاتف', form.phone],
      ['التخصص', form.specialty],
      ['الخبرة', form.experience],
      ['الملفات المرفقة (سترفق يدوياً)', cvFiles.map((f) => f.name).join('، ')],
    ]);
    setSent(true);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-purple-300/40 outline-none transition ${
      hasError
        ? 'border-red-500/60 bg-red-950/20 focus:border-red-500'
        : 'border-purple-500/30 bg-purple-900/20 focus:border-purple-400 focus:bg-purple-900/30'
    }`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 z-[90] max-h-[88vh] -translate-y-1/2 overflow-y-auto glass-strong rounded-2xl p-6 shadow-2xl sm:inset-x-auto sm:start-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:p-8"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute end-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 text-purple-300 transition hover:border-purple-400 hover:text-white"
            >
              <X size={14} />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle className="text-purple-400" size={52} strokeWidth={1.5} />
                <p className="mt-5 text-lg font-semibold text-white">
                  فتحنالك تطبيق البريد
                </p>
                <p className="mt-2 text-sm text-purple-200/70">
                  راجعي الرسالة واضغطي إرسال داخل تطبيق البريد لإكمال طلبك
                </p>
                {cvFiles.length > 0 && (
                  <div className="mt-4 w-full rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-start">
                    <p className="text-xs font-semibold text-amber-300">
                      ⚠ لا تنسي إرفاق هذي الملفات يدوياً بالرسالة قبل الإرسال (البريد ما يرفقها تلقائياً):
                    </p>
                    <ul className="mt-1.5 space-y-0.5 text-xs text-amber-200/80">
                      {cvFiles.map((file, i) => (
                        <li key={`${file.name}-${i}`} className="truncate">• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-medium text-[#ffffff] transition hover:bg-purple-500"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">قدّم كمدرّب</h2>
                <p className="mt-1 text-sm text-purple-300/70">شارك خبرتك مع طلاب الجزري</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <input
                      required
                      placeholder="الاسم الكامل"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onBlur={() => markTouched('name')}
                      className={fieldClass(touched.name && errors.name)}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onBlur={() => markTouched('email')}
                      className={fieldClass(touched.email && errors.email)}
                    />
                  </div>
                  <PhoneInput
                    required
                    value={form.phone}
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    onValidityChange={setPhoneValid}
                  />
                  <div>
                    <input
                      required
                      placeholder="التخصص (مثلاً: الروبوتات، الذكاء الاصطناعي)"
                      value={form.specialty}
                      onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                      onBlur={() => markTouched('specialty')}
                      className={fieldClass(touched.specialty && errors.specialty)}
                    />
                    {touched.specialty && errors.specialty && (
                      <p className="mt-1.5 text-xs text-red-400">التخصص لازم يكون حرفين على الأقل</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="خبرتك العملية أو التدريسية"
                      value={form.experience}
                      onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                      onBlur={() => markTouched('experience')}
                      className={`resize-none ${fieldClass(touched.experience && errors.experience)}`}
                    />
                    {touched.experience && errors.experience && (
                      <p className="mt-1.5 text-xs text-red-400">اكتبي وصفاً أكثر تفصيلاً (١٠ أحرف على الأقل)</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-purple-200/80">
                      السيرة الذاتية / نماذج أعمال{' '}
                      <span className="font-normal text-purple-400/60">
                        ({ALLOWED_LABEL} — حتى {MAX_FILES} ملفات، ملف واحد إجباري)
                      </span>
                    </label>

                    <label
                      htmlFor="trainer-cv-upload"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-purple-500/40 bg-purple-900/10 px-4 py-6 text-center transition hover:border-purple-400 hover:bg-purple-900/20"
                    >
                      <Paperclip size={20} className="text-purple-400/70" />
                      <span className="text-sm text-purple-200/70">اضغطي لاختيار الملفات أو اسحبيها هنا</span>
                      <input
                        id="trainer-cv-upload"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleFilesSelected(e.target.files);
                          e.target.value = '';
                        }}
                      />
                    </label>

                    {cvFiles.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {cvFiles.map((file, i) => (
                          <li
                            key={`${file.name}-${i}`}
                            className="flex items-center justify-between gap-2 rounded-lg border border-purple-500/20 bg-purple-900/20 px-3 py-2 text-xs text-purple-100"
                          >
                            <span className="truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="shrink-0 text-purple-300/60 transition hover:text-red-400"
                              aria-label={`حذف ${file.name}`}
                            >
                              <X size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-purple-600 py-3.5 text-sm font-semibold text-[#ffffff] transition hover:bg-purple-500 disabled:opacity-60"
                  >
                    إرسال الطلب
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}