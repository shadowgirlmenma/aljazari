'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { X, CheckCircle } from 'lucide-react';
import PhoneInput from '@/components/ui/PhoneInput';
import { api, ApiError } from '@/lib/api';

export default function BookRobotModal({
  open, onClose, robotSlug, robotName,
}: {
  open: boolean;
  onClose: () => void;
  robotSlug: string;
  robotName: string;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    type: 'rent' as 'buy' | 'rent',
    name: '', email: '', phone: '', organization: '', notes: '',
  });

  const errors = {
    name: form.name.length > 0 && form.name.trim().length < 2,
    email: form.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
  };

  const markTouched = (f: string) => setTouched((t) => ({ ...t, [f]: true }));

  const reset = () => {
    setSent(false);
    setForm({ type: 'rent', name: '', email: '', phone: '', organization: '', notes: '' });
    setTouched({});
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneValid) { toast.error('رقم الهاتف غير مكتمل'); return; }
    if (errors.name || errors.email) { toast.error('راجعي الحقول المظلّلة بالأحمر'); return; }

    setLoading(true);
    try {
      await api.requestRobot({
        robot_slug: robotSlug,
        robot_name: robotName,
        request_type: form.type,
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        organization: form.organization || undefined,
        notes: form.notes || undefined,
      });
      setSent(true);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
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
            className="fixed inset-x-4 top-1/2 z-[90] max-h-[88vh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-purple-500/25 bg-[#120621] p-6 shadow-2xl sm:inset-x-auto sm:start-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:p-8"
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
                  تم استلام طلبك بنجاح
                </p>
                <p className="mt-2 text-sm text-purple-200/70">
                  سيتواصل معك فريقنا قريباً لتأكيد التفاصيل
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">{robotName}</h2>
                <p className="mt-1 text-sm text-purple-300/70">اطلبيه الآن</p>

                {/* شراء أو إيجار */}
                <div className="mt-5 flex gap-2">
                  {(['rent', 'buy'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${
                        form.type === t
                          ? 'border-purple-500 bg-purple-600 text-white'
                          : 'border-purple-500/30 text-purple-200/60 hover:border-purple-400'
                      }`}
                    >
                      {t === 'rent' ? 'إيجار' : 'شراء'}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
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
                  <input
                    placeholder="اسم المؤسسة (اختياري)"
                    value={form.organization}
                    onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                    className={fieldClass(false)}
                  />
                  <textarea
                    rows={3}
                    placeholder="ملاحظات إضافية (اختياري)"
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    className={`resize-none ${fieldClass(false)}`}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-purple-600 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                  >
                    {loading ? '...' : 'إرسال الطلب'}
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