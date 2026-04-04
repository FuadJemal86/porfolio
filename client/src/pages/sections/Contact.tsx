import { type FormEvent, useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { SOCIAL } from '../../constants/social';
import { AnimatePresence, motion } from 'framer-motion';

type ContactStatus =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | null;

function formatEmailJsError(err: unknown): string {
  const fallback = 'Failed to send message. Please try again in a moment.';
  if (typeof err === 'string' && err.trim()) {
    return err.length > 320 ? `${err.slice(0, 320)}…` : err;
  }
  if (err && typeof err === 'object' && 'text' in err) {
    const raw = String((err as { text?: string }).text ?? '').trim();
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw) as { message?: string; error?: string };
      const detail = (parsed.message || parsed.error || raw).trim();
      return detail.length > 320 ? `${detail.slice(0, 320)}…` : detail;
    } catch {
      return raw.length > 320 ? `${raw.slice(0, 320)}…` : raw;
    }
  }
  if (err instanceof Error && err.message) {
    return err.message.length > 320 ? `${err.message.slice(0, 320)}…` : err.message;
  }
  return fallback;
}

export function Contact() {
  /** Inbox for EmailJS contact form only (footer / mailto elsewhere stay fuad.jemal.mail@gmail.com). */
  const emailjsRecipientEmail = 'fuad47722@gmail.com';

  const emailjsServiceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined)?.trim();
  const emailjsTemplateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined)?.trim();
  const emailjsPublicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);

  const isConfigured = useMemo(
    () => Boolean(emailjsServiceId && emailjsTemplateId && emailjsPublicKey),
    [emailjsServiceId, emailjsTemplateId, emailjsPublicKey],
  );

  useEffect(() => {
    if (!emailjsPublicKey) return;
    emailjs.init({ publicKey: emailjsPublicKey });
  }, [emailjsPublicKey]);

  const validate = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) return 'Please enter your name.';
    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (trimmedPhone.length < 8) return 'Please enter your phone number.';
    if (phoneDigits.length < 8) return 'Please enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) return 'Please enter a valid email address.';
    if (trimmedMessage.length < 5) return 'Please enter your message (at least 5 characters).';
    return null;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const validationError = validate();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message:
          'Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.',
      });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const trimmedEmail = email.trim();
      await emailjs.send(
        emailjsServiceId!,
        emailjsTemplateId!,
        {
          to_email: emailjsRecipientEmail,
          from_name: name.trim(),
          from_phone: phone.trim(),
          phone: phone.trim(),
          from_email: trimmedEmail,
          reply_to: trimmedEmail,
          message: message.trim(),
        },
        { publicKey: emailjsPublicKey! },
      );

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      if (import.meta.env.DEV) console.error('EmailJS send failed:', err);
      setStatus({
        type: 'error',
        message: formatEmailJsError(err),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[#8b5cf6] text-xs sm:text-sm uppercase tracking-widest mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300">Contact Me</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-[#1e2024] to-[#23272b] p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col h-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2">Fuad Jemal</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm">
              Full Stack Developer
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              I am available for freelance work. Connect with me via phone or email.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 text-gray-400 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#8b5cf6]">
                  <Phone size={18} className="sm:w-5 sm:h-5" />
                </div>
                <a href="tel:+251902920301" className="text-sm sm:text-base break-all">
                  +251 902920301
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-gray-400 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#8b5cf6]">
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                </div>
                <a href="mailto:fuad.jemal.mail@gmail.com" className="text-sm sm:text-base break-all">
                  fuad.jemal.mail@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 text-gray-400 text-sm sm:text-base">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#8b5cf6] mt-0.5">
                  <MapPin size={18} className="sm:w-5 sm:h-5" />
                </div>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 sm:mb-4">Find me in</p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {(
                [
                  { href: SOCIAL.linkedin, label: 'LinkedIn', icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" /> },
                  { href: SOCIAL.github, label: 'GitHub', icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" /> },
                  { href: SOCIAL.x, label: 'X', icon: <Twitter className="w-5 h-5 sm:w-6 sm:h-6" /> },
                ] as const
              ).map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1e2024] shadow-xl flex items-center justify-center text-white hover:text-[#8b5cf6] hover:-translate-y-1 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-gradient-to-br from-[#1e2024] to-[#23272b] p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl min-w-0 h-full"
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={onSubmit}>
              <div className="sm:col-span-1">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] outline-none transition-all shadow-inner"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] outline-none transition-all shadow-inner"
                  placeholder="+251 9…"
                  autoComplete="tel"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] outline-none transition-all shadow-inner"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] outline-none transition-all shadow-inner resize-y min-h-[120px] sm:min-h-[150px]"
                  placeholder="Write your message..."
                />
              </div>

              <div className="sm:col-span-2">
                <AnimatePresence>
                  {status && (
                    <motion.div
                      key={status.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className={`rounded-lg border px-4 py-3 text-sm ${
                        status.type === 'success'
                          ? 'bg-green-500/10 border-green-500/30 text-green-200'
                          : 'bg-red-500/10 border-red-500/30 text-red-200'
                      }`}
                      role={status.type === 'success' ? 'status' : 'alert'}
                      aria-live="polite"
                    >
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                className="sm:col-span-2 py-3 sm:py-4 rounded-lg bg-[#1e2024] shadow-2xl text-[#8b5cf6] text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-[#8b5cf6] hover:text-white transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
