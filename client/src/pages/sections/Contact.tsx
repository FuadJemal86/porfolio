import { type FormEvent, useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Phone, Mail, MapPin, Linkedin, Github, Twitter, Send, MessageSquare } from 'lucide-react';
import { SOCIAL } from '../../constants/social';

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

/* -----------------------------------------------------------------
   Animation variants
   ----------------------------------------------------------------- */
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 110,
      damping: 15,
    },
  },
};

/* -----------------------------------------------------------------
   Ambient floating particles (flat, no 3D)
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: 'rgba(201,255,77,0.12)',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------
   Contact info panel — outline only, flat (no 3D tilt)
   ----------------------------------------------------------------- */
function ContactInfoCard() {
  const contactInfo = [
    { icon: Phone, label: '+251 902920301', href: 'tel:+251902920301' },
    { icon: Mail, label: 'fuad.jemal.mail@gmail.com', href: 'mailto:fuad.jemal.mail@gmail.com' },
    { icon: MapPin, label: 'Addis Ababa, Ethiopia', href: null },
  ];

  const socialLinks = [
    { href: SOCIAL.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: SOCIAL.github, label: 'GitHub', icon: Github },
    { href: SOCIAL.x, label: 'X', icon: Twitter },
  ];

  return (
    <motion.div
      variants={cardVariant}
      style={{ rotate: '-1deg' }}
      whileHover={{ rotate: 0 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 20 }}
      className="relative h-full"
    >
      <div
        className="relative h-full p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden"
        style={{ border: '2px solid var(--line)', background: 'var(--bg)' }}
      >
        <motion.h3
          variants={itemVariant}
          className="font-heading text-2xl sm:text-3xl font-bold text-[color:var(--ink)] mb-2"
        >
          Fuad Jemal
        </motion.h3>
        <motion.p
          variants={itemVariant}
          className="font-mono-ui mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          Full Stack Developer
        </motion.p>
        <motion.p
          variants={itemVariant}
          className="text-[color:var(--muted)] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed"
        >
          I am available for freelance work. Connect with me via phone or email.
        </motion.p>

        {/* Contact info */}
        <motion.div variants={containerVariant} className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {contactInfo.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariant}
              whileHover={{ x: 8 }}
              className="flex items-center gap-3 sm:gap-4 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors group/item"
            >
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center"
                style={{ border: '2px solid var(--line)', color: 'var(--accent)' }}
              >
                <item.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm sm:text-base break-all hover:text-[color:var(--accent)] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-sm sm:text-base">{item.label}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariant}>
          <p className="font-mono-ui text-[color:var(--muted)] text-xs uppercase tracking-widest mb-3 sm:mb-4">
            Find me in
          </p>
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-all"
                style={{ border: '2px solid var(--line)' }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Contact form panel — outline only, flat (no 3D tilt)
   ----------------------------------------------------------------- */
function ContactFormCard({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  message,
  setMessage,
  sending,
  status,
  onSubmit,
}: {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  sending: boolean;
  status: ContactStatus;
  onSubmit: (e: FormEvent) => void;
}) {
  const inputClasses =
    'w-full min-w-0 box-border rounded-xl p-3 sm:p-4 text-sm sm:text-base outline-none transition-all';
  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: '2px solid var(--line)',
    color: 'var(--ink)',
  };

  return (
    <motion.div
      variants={cardVariant}
      style={{ rotate: '1deg' }}
      whileHover={{ rotate: 0 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 20 }}
      className="relative"
    >
      <div
        className="relative p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden"
        style={{ border: '2px solid var(--line)', background: 'var(--bg)' }}
      >
        <form className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={onSubmit}>
          <div className="sm:col-span-1">
            <label className="font-mono-ui text-[color:var(--muted)] text-xs uppercase font-semibold mb-2 sm:mb-3 block">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="font-mono-ui text-[color:var(--muted)] text-xs uppercase font-semibold mb-2 sm:mb-3 block">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClasses}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              placeholder="+251 9…"
              autoComplete="tel"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-mono-ui text-[color:var(--muted)] text-xs uppercase font-semibold mb-2 sm:mb-3 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-mono-ui text-[color:var(--muted)] text-xs uppercase font-semibold mb-2 sm:mb-3 block">
              Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClasses} resize-y min-h-[120px] sm:min-h-[150px]`}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
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
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    border: `2px solid ${status.type === 'success' ? '#4ade80' : '#f87171'}`,
                    color: status.type === 'success' ? '#86efac' : '#fca5a5',
                    background: 'transparent',
                  }}
                  role={status.type === 'success' ? 'status' : 'alert'}
                  aria-live="polite"
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className="font-heading sm:col-span-2 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold uppercase tracking-widest transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            style={{ background: 'var(--accent)', color: '#0a0a0a' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={sending}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
              initial={{ x: '-200%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.8 }}
            />
            <Send className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{sending ? 'Sending...' : 'Send Message'}</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Contact component
   ----------------------------------------------------------------- */
export function Contact() {
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
    <section
      id="contact"
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-labelledby="contact-heading"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Oversized watermark word */}
      <div
        aria-hidden
        className="font-heading absolute select-none pointer-events-none whitespace-nowrap font-bold"
        style={{
          top: '4%',
          left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          fontSize: 'clamp(3.5rem, 16vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          zIndex: 0,
        }}
      >
        SAY · HELLO · NOW
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariant}
            className="font-mono-ui inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-wider mb-6"
            style={{
              background: 'rgba(201,255,77,0.08)',
              borderColor: 'rgba(201,255,77,0.3)',
              color: 'var(--accent)',
              rotate: '2deg',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Contact
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="contact-heading"
            variants={itemVariant}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[color:var(--ink)]">Contact </span>
            <span className="relative inline-block px-2">
              <span
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: 'var(--accent)', transform: 'rotate(2deg)' }}
              />
              Me
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-lg max-w-2xl mx-auto"
          >
            Have a project in mind? Let&apos;s work together to bring your ideas to life
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12"
        >
          {/* Info Card */}
          <div className="lg:col-span-5">
            <ContactInfoCard />
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <ContactFormCard
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              message={message}
              setMessage={setMessage}
              sending={sending}
              status={status}
              onSubmit={onSubmit}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}