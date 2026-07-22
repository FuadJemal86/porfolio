import { motion, type Variants } from 'framer-motion';
import {
  Award,
  Smartphone,
  Globe,
  Cloud,
  Sparkles,
  Database,
  Zap,
} from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const capabilities = [
  {
    title: 'Mobile Apps',
    text: 'iOS & Android apps that feel native, fast, and built to last.',
    icon: <Smartphone className="w-5 h-5" />,
    rotate: -3,
  },
  {
    title: 'Web Apps',
    text: 'Fast, accessible, production-grade apps with the MERN stack.',
    icon: <Globe className="w-5 h-5" />,
    rotate: 2,
  },
  {
    title: 'SaaS Products',
    text: 'Multi-tenant platforms engineered to scale from day one.',
    icon: <Cloud className="w-5 h-5" />,
    rotate: -2,
  },
  {
    title: 'AI Integration',
    text: 'LLM-powered features, automation, and smart workflows baked in.',
    icon: <Sparkles className="w-5 h-5" />,
    rotate: 3,
  },
  {
    title: 'ERP Systems',
    text: 'Custom-built systems that run real inventories, teams, and money.',
    icon: <Database className="w-5 h-5" />,
    rotate: -1,
  },
  {
    title: '& Beyond',
    text: 'APIs, dashboards, integrations — whatever the problem needs.',
    icon: <Zap className="w-5 h-5" />,
    rotate: 2,
  },
];

const stickers = [
  { value: '15+', label: 'Projects', rotate: -6 },
  { value: '3+', label: 'Years', rotate: 4 },
  { value: '100%', label: 'Client happy', rotate: -3 },
];

/* -----------------------------------------------------------------
   Animation variants
   ----------------------------------------------------------------- */
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

/* -----------------------------------------------------------------
   Ambient floating particles (flat, no 3D)
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            background: 'rgba(201,255,77,0.15)',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------
   Capability card — scrapbook / sticker style, flat (no 3D)
   ----------------------------------------------------------------- */
function CapabilityCard({
  title,
  text,
  icon,
  rotate,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  rotate: number;
}) {
  return (
    <motion.div
      variants={itemVariant}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 18 }}
      style={{
        rotate: `${rotate}deg`,
        background: 'var(--bg)',
        border: '2px solid var(--line)',
        boxShadow: '6px 6px 0 rgba(201,255,77,0.9)',
      }}
      className="rounded-2xl p-5 relative"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(201,255,77,0.12)', color: 'var(--accent)' }}
      >
        {icon}
      </div>
      <h3 className="font-heading text-lg font-bold text-[color:var(--ink)] mb-1.5">
        {title}
      </h3>
      <p className="text-[color:var(--muted)] text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   About component
   ----------------------------------------------------------------- */
export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 md:py-36 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-labelledby="about-heading"
    >
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
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%) rotate(-4deg)',
          fontSize: 'clamp(4rem, 18vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          zIndex: 0,
        }}
      >
        BLAZORA · DEV ·
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariant}
            className="font-mono-ui inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-wider mb-8"
            style={{
              background: 'rgba(201,255,77,0.08)',
              borderColor: 'rgba(201,255,77,0.3)',
              color: 'var(--accent)',
              rotate: '-2deg',
            }}
          >
            <Award className="w-4 h-4" />
            My Story
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="about-heading"
            variants={itemVariant}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.02] max-w-3xl"
          >
            <span className="text-[color:var(--ink)]">About </span>
            <span
              className="relative inline-block px-2"

            >
              <span
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: 'var(--accent)', transform: 'rotate(-2deg)' }}
              />
              Me
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl"
          >
            I&apos;m a{' '}
            <span className="text-[color:var(--ink)] font-semibold">
              Full Stack Developer and Software Engineer
            </span>{' '}
            who builds across the entire stack — mobile, web, and everything that
            keeps a business running behind the scenes.
          </motion.p>

          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-base leading-relaxed mb-14 max-w-2xl"
          >
            Over the last three years I&apos;ve shipped mobile apps, web platforms,
            SaaS products, AI-integrated tools, and ERP systems that run real
            teams and real money — with Django and the MERN stack as my daily
            drivers, and a habit of shipping fast without cutting corners.
          </motion.p>

          {/* Capability cards — scattered scrapbook grid */}
          <motion.div
            variants={containerVariant}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16"
          >
            {capabilities.map((cap) => (
              <CapabilityCard key={cap.title} {...cap} />
            ))}
          </motion.div>

          {/* Stat stickers */}
          <motion.div
            variants={itemVariant}
            className="flex flex-wrap items-center gap-5 mb-12"
          >
            {stickers.map((s) => (
              <div
                key={s.label}
                style={{
                  rotate: `${s.rotate}deg`,
                  border: '2px dashed var(--line)',
                  background: 'rgba(255,255,255,0.02)',
                }}
                className="rounded-xl px-5 py-3 text-center"
              >
                <p className="font-heading text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                  {s.value}
                </p>
                <p className="font-mono-ui text-[10px] uppercase tracking-wider text-[color:var(--muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariant}>
            <motion.a
              href="#contact"
              className="font-heading inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm relative overflow-hidden group"
              style={{ background: 'var(--accent)', color: '#0a0a0a', rotate: '-1deg' }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
                initial={{ x: '-200%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10">Let&apos;s Work Together</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}