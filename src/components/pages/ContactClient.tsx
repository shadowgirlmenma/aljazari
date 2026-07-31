'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import PhoneInput from '@/components/ui/PhoneInput';
import AnimatedSelect from '@/components/ui/AnimatedSelect';
import { api, ApiError } from '@/lib/api';

export default function ContactClient({
  title, subtitle,
  nameLabel, emailLabel, phoneLabel,
  subjectLabel, messageLabel, submitLabel, successMsg,
  subjects, infoTitle, address, phone, email,
  hoursLabel, hours,
}: {
  title: string; subtitle: string;
  nameLabel: string; emailLabel: string; phoneLabel: string;
  subjectLabel: string; messageLabel: string;
  submitLabel: string; successMsg: string;
  subjects: string[];
  infoTitle: string; address: string;
  phone: string; email: string;
  hoursLabel: string; hours: string;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });

  const errors = {
    name: form.name.length > 0 && form.name.trim().length < 2,
    email: form.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    message: form.message.length > 0 && form.message.trim().length < 5,
  };

  const markTouched = (field: string) =>
    setTouchedFields((t) => ({ ...t, [field]: true }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneValid) {
      toast.error('رقم الهاتف غير مكتمل');
      return;
    }
    if (errors.name || errors.email || errors.message) {
      toast.error('راجعي الحقول المظلّلة بالأحمر');
      return;
    }

    setLoading(true);
    try {
      await api.sendContactMessage({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : 'تعذّر الاتصال بالخادم — تأكدي أن الباكند شغّال'
      );
    } finally {
      setLoading(false);
    }
  };

  const INFO = [
    { icon: MapPin, label: address },
    { icon: Phone, label: phone, href: `tel:${phone}`, dir: 'ltr' as const },
    { icon: Mail,  label: email, href: `mailto:${email}` },
    { icon: Clock, label: hours, prefix: hoursLabel },
  ];

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-purple-300/40 outline-none transition ${
      hasError
        ? 'border-red-500/60 bg-red-950/20 focus:border-red-500'
        : 'border-purple-500/30 bg-purple-900/20 focus:border-purple-400 focus:bg-purple-900/30'
    }`;

  return (
    <>
      <div className="relative overflow-hidden bg-[#120621]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(124,71,224,0.3) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400"
          >
            Al-Jazari Robotics
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mx-auto mt-4 max-w-xl text-purple-200/80"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-900/20 px-8 py-20 text-center"
                  >
                    <CheckCircle className="text-purple-400" size={56} strokeWidth={1.5} />
                    <p className="mt-6 text-xl font-semibold text-white">{successMsg}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                          {nameLabel}
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          onBlur={() => markTouched('name')}
                          className={fieldClass(touchedFields.name && errors.name)}
                        />
                        {touchedFields.name && errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">الاسم لازم يكون حرفين على الأقل</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                          {emailLabel}
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          onBlur={() => markTouched('email')}
                          className={fieldClass(touchedFields.email && errors.email)}
                        />
                        {touchedFields.email && errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">صيغة البريد الإلكتروني غير صحيحة</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                        {phoneLabel}
                      </label>
                      <PhoneInput
                        required
                        value={form.phone}
                        onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                        onValidityChange={setPhoneValid}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                        {subjectLabel}
                      </label>
                      <AnimatedSelect
                        options={subjects}
                        value={form.subject}
                        onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                        {messageLabel}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        onBlur={() => markTouched('message')}
                        className={`resize-none ${fieldClass(touchedFields.message && errors.message)}`}
                      />
                      {touchedFields.message && errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">الرسالة قصيرة جداً — ٥ أحرف على الأقل</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-purple-600 py-4 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                    >
                      {loading ? '...' : submitLabel}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{infoTitle}</h2>
                <ul className="mt-6 space-y-5">
                  {INFO.map(({ icon: Icon, label, href, dir, prefix }, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/30 text-purple-400">
                        <Icon size={16} />
                      </span>
                      <div className="pt-2 text-sm leading-relaxed text-purple-200/75">
                        {prefix && (
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-purple-400">
                            {prefix}
                          </span>
                        )}
                        {href ? (
                          <a href={href} dir={dir} className="transition hover:text-white">
                            {label}
                          </a>
                        ) : (
                          <span>{label}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="موقع الجزري"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.7!2d44.3661!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE5JzEwLjciTiA0NMKwMjEnNTguNiJF!5e0!3m2!1sar!2siq"
                  className="h-64 w-full grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}