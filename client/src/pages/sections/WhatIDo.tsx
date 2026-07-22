import { motion, type Variants } from 'framer-motion';
import { Server, Layout, Database, Search, ShieldCheck, Layers, Sparkles, ArrowRight } from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const services = [
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Expertise in Django and Node.js for robust, scalable server-side logic.',
    rotate: -3,
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    desc: 'Building responsive, dynamic UIs with React.js and modern CSS frameworks.',
    rotate: 2,
  },
  {
    icon: Database,
    title: 'System Architecture',
    desc: 'Designing complex database schemas with MySQL, PostgreSQL, and MongoDB.',
    rotate: -2,
  },
  {
    icon: Search,
    title: 'Data Scraping',
    desc: 'Automated tools for collecting and processing structured data from the web.',
    rotate: 3,
  },
  {
    icon: Layers,
    title: 'ERP Systems',
    desc: 'Developing custom management platforms for business operations and tracking.',
    rotate: -1,
  },
  {
    icon: ShieldCheck,
    title: 'Mobile App',
    desc: 'Developing mobile applications from concept to deployment.',
    rotate: 2,
  },
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
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: 'rgba(201,255,77,0.12)',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
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
   Service card — scrapbook / sticker style, flat (no 3D tilt)
   ----------------------------------------------------------------- */
function ServiceCard({
  icon: Icon,
  title,
  desc,
  rotate,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  rotate: number;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 18 }}
      style={{ rotate: `${rotate}deg` }}
      className="relative group"
    >
      {/* Card */}
      <div
        className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{
          background: 'var(--bg)',
          border: '2px solid var(--line)',
          boxShadow: '6px 6px 0 rgba(201,255,77,0.9)',
        }}
      >
        {/* Icon */}
        <motion.div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-colors duration-300"
          style={{ background: 'rgba(201,255,77,0.12)' }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: 'var(--accent)' }} />
        </motion.div>

        {/* Title */}
        <h3 className="font-heading relative text-xl sm:text-2xl font-bold text-[color:var(--ink)] mb-3 sm:mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-[color:var(--muted)] text-sm sm:text-base leading-relaxed">
          {desc}
        </p>

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--accent)' }}
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   WhatIDo component
   ----------------------------------------------------------------- */
export function WhatIDo() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-labelledby="services-heading"
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
          transform: 'translateX(-50%) rotate(3deg)',
          fontSize: 'clamp(3.5rem, 16vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          zIndex: 0,
        }}
      >
        CODE · CRAFT · SHIP
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
              rotate: '-2deg',
            }}
          >
            <Sparkles className="w-4 h-4" />
            Services
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="services-heading"
            variants={itemVariant}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[color:var(--ink)]">What I </span>
            <span className="relative inline-block px-2">
              <span
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: 'var(--accent)', transform: 'rotate(2deg)' }}
              />
              Do
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-lg max-w-2xl mx-auto"
          >
            Comprehensive development services tailored to bring your ideas to life with cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              desc={service.desc}
              rotate={service.rotate}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}