import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { Phone, Mail, MapPin, Linkedin, Github, Twitter, Send, MessageSquare } from 'lucide-react';
import { SOCIAL } from '../../constants/social';
import { AnimatePresence } from 'framer-motion';

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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

/* -----------------------------------------------------------------
   Floating particles component
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#8b5cf6]/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
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
   Contact info card with 3D tilt effect
   ----------------------------------------------------------------- */
function ContactInfoCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(94,179,246,0.6) 100%)',
        }}
      />

      {/* Card */}
      <div className="relative h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#1e2024] border border-[#8b5cf6]/10 shadow-xl overflow-hidden group-hover:border-[#8b5cf6]/30 transition-all duration-500">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative">
          <motion.h3
            variants={itemVariant}
            className="text-2xl sm:text-3xl font-bold text-white mb-2"
          >
            Fuad Jemal
          </motion.h3>
          <motion.p
            variants={itemVariant}
            className="text-[#8b5cf6] mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm font-semibold"
          >
            Full Stack Developer
          </motion.p>
          <motion.p
            variants={itemVariant}
            className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed"
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
                className="flex items-center gap-3 sm:gap-4 text-gray-400 hover:text-white transition-colors group/item"
              >
                <motion.div
                  className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover/item:bg-[#8b5cf6]/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon size={18} className="sm:w-5 sm:h-5" />
                </motion.div>
                {item.href ? (
                  <a href={item.href} className="text-sm sm:text-base break-all hover:text-[#8b5cf6] transition-colors">
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
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 sm:mb-4">Find me in</p>
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
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#191b1e] border border-[#8b5cf6]/10 flex items-center justify-center text-gray-400 hover:text-[#8b5cf6] hover:border-[#8b5cf6]/30 transition-all"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Contact form card
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(94,179,246,0.6) 100%)',
        }}
      />

      {/* Card */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#1e2024] border border-[#8b5cf6]/10 shadow-xl overflow-hidden group-hover:border-[#8b5cf6]/30 transition-all duration-500">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Form */}
        <form className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={onSubmit}>
          <div className="sm:col-span-1">
            <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#8b5cf6]/10 rounded-xl p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
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
              className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#8b5cf6]/10 rounded-xl p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
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
              className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#8b5cf6]/10 rounded-xl p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
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
              className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#8b5cf6]/10 rounded-xl p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all resize-y min-h-[120px] sm:min-h-[150px]"
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
                  className={`rounded-xl border px-4 py-3 text-sm ${status.type === 'success'
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

          <motion.button
            type="submit"
            className="sm:col-span-2 py-3 sm:py-4 rounded-xl bg-[#8b5cf6] text-white text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-[#7c3aed] transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={sending}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
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
      className="relative py-20 sm:py-24 md:py-32 bg-[#0f0f13] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(94,179,246,0.06) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs uppercase tracking-wider mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            Contact
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="contact-heading"
            variants={itemVariant}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Contact </span>
            <motion.span
              className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#5eb3f6] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Me
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariant}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
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
          className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10"
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
