import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowUp } from 'lucide-react';
import { SOCIAL } from '../../constants/social';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const footerLinks: { label: string; href: string }[] = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

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

const linkVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

/* -----------------------------------------------------------------
   Social link — outline style, flat (matches ContactInfoCard icons)
   ----------------------------------------------------------------- */
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-all"
      style={{ border: '2px solid var(--line)' }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}

/* -----------------------------------------------------------------
   Footer link component
   ----------------------------------------------------------------- */
function FooterLink({ label, href, index }: { label: string; href: string; index: number }) {
  return (
    <motion.li variants={linkVariant} transition={{ delay: 0.1 + index * 0.05 }}>
      <motion.a
        href={href}
        className="text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors relative group inline-block text-sm sm:text-base"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="relative z-10">{label}</span>
        <motion.span
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'var(--accent)' }}
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.li>
  );
}

/* -----------------------------------------------------------------
   Footer component
   ----------------------------------------------------------------- */
export function Footer() {
  const scrollToTop = () => {
    const pane = document.getElementById('portfolio-scroll');
    if (pane && window.matchMedia('(min-width: 1024px)').matches) {
      pane.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Linkedin size={18} className="sm:w-5 sm:h-5" />, href: SOCIAL.linkedin, label: 'LinkedIn' },
    { icon: <Github size={18} className="sm:w-5 sm:h-5" />, href: SOCIAL.github, label: 'GitHub' },
    { icon: <Twitter size={18} className="sm:w-5 sm:h-5" />, href: SOCIAL.x, label: 'X' },
  ];

  return (
    <footer
      className="relative pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10"
      style={{ background: 'var(--section-bg)', borderTop: '1px solid var(--border-color)' }}
    >
      {/* Back to top button — outline style, matches contact icons */}
      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-md flex items-center justify-center text-[color:var(--button-bg)] transition-colors"
        style={{ background: 'var(--section-bg)', border: '1px solid var(--border-color)' }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 1,
          type: 'spring' as const,
          stiffness: 200,
        }}
        whileHover={{ scale: 1.1, y: -5, borderColor: 'var(--accent)' }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowUp size={22} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-8 mb-12 sm:mb-16 text-left"
        >
          {/* About Column */}
          <motion.div variants={cardVariant} className="flex flex-col gap-4 sm:gap-6 items-start">
            <motion.h4
              variants={itemVariant}
              className="font-heading text-xl sm:text-2xl font-bold text-[color:var(--ink)]"
            >
              Fuad Jemal
            </motion.h4>
            <motion.p
              className="font-mono-ui text-[color:var(--muted)] leading-relaxed text-sm max-w-sm"
              variants={itemVariant}
            >
              Building scalable, secure, and modern digital experiences with Django, MERN, and a passion for clean
              architecture.
            </motion.p>
            <div className="flex gap-3 sm:gap-4 justify-start">
              {socialLinks.map((social, i) => (
                <SocialLink key={i} {...social} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariant}>
            <motion.h4
              className="font-mono-ui text-[color:var(--accent)] text-xs sm:text-sm uppercase tracking-widest font-semibold mb-6 sm:mb-8"
              variants={itemVariant}
            >
              Quick Links
            </motion.h4>
            <motion.ul className="space-y-3 sm:space-y-4" variants={containerVariant}>
              {footerLinks.map(({ label, href }, i) => (
                <FooterLink key={label} label={label} href={href} index={i} />
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariant} className="sm:col-span-2 lg:col-span-1">
            <motion.h4
              className="font-mono-ui text-[color:var(--accent)] text-xs sm:text-sm uppercase tracking-widest font-semibold mb-6 sm:mb-8"
              variants={itemVariant}
            >
              Get In Touch
            </motion.h4>
            <motion.div
              className="space-y-3 sm:space-y-4 text-[color:var(--muted)] text-sm"
              variants={itemVariant}
            >
              <motion.p
                className="flex items-start justify-start gap-3 min-w-0"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Mail size={16} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                <a
                  href="mailto:fuad.jemal.mail@gmail.com"
                  className="break-all hover:text-[color:var(--accent)] transition-colors"
                >
                  fuad.jemal.mail@gmail.com
                </a>
              </motion.p>
              <motion.p
                className="flex items-start justify-start gap-3 min-w-0"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MapPin size={16} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Addis Ababa, Ethiopia</span>
              </motion.p>
              <motion.p
                className="mt-4 text-xs italic opacity-60 font-mono-ui"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Available for freelance projects and technical collaborations.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="pt-8 sm:pt-10 text-center px-0"
          style={{ borderTop: '2px solid var(--line)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono-ui text-[color:var(--muted)] text-xs sm:text-sm leading-relaxed">
            © {new Date().getFullYear()}. All rights reserved by{' '}
            <motion.span
              className="text-[color:var(--accent)] font-semibold"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-block' }}
            >
              Fuad Jemal
            </motion.span>
            .
          </p>
        </motion.div>
      </div>
    </footer>
  );
}