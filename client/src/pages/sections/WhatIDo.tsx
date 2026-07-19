import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { Server, Layout, Database, Search, ShieldCheck, Layers, Sparkles, ArrowRight } from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const services = [
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Expertise in Django and Node.js for robust, scalable server-side logic.',
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    desc: 'Building responsive, dynamic UIs with React.js and modern CSS frameworks.',
  },
  {
    icon: Database,
    title: 'System Architecture',
    desc: 'Designing complex database schemas with MySQL, PostgreSQL, and MongoDB.',
  },
  {
    icon: Search,
    title: 'Data Scraping',
    desc: 'Automated tools for collecting and processing structured data from the web.',
  },
  {
    icon: Layers,
    title: 'ERP Systems',
    desc: 'Developing custom management platforms for business operations and tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'Mobile App',
    desc: 'Developing mobile applications from concept to deployment.',
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
   Floating particles component
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }, (_, i) => (
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
   Service card with 3D tilt effect
   ----------------------------------------------------------------- */
function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(94,179,246,0.6) 100%)',
        }}
      />

      {/* Card */}
      <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1e2024] border border-[#8b5cf6]/10 shadow-xl overflow-hidden group-hover:border-[#8b5cf6]/30 transition-all duration-500">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 via-transparent to-[#5eb3f6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: 'translateX(-100%) skewX(-12deg)',
          }}
          whileHover={{
            transform: 'translateX(100%) skewX(-12deg)',
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Icon */}
        <motion.div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[#8b5cf6]/20 transition-colors duration-300"
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#8b5cf6] group-hover:text-[#a78bfa] transition-colors" />
        </motion.div>

        {/* Title */}
        <h3 className="relative text-xl sm:text-2xl font-bold text-gray-200 group-hover:text-white mb-3 sm:mb-4 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-gray-400 group-hover:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors">
          {desc}
        </p>

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl sm:rounded-tr-3xl" />
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
      className="relative py-20 sm:py-24 md:py-32 bg-[#0f0f13] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(94,179,246,0.06) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
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
            <Sparkles className="w-4 h-4" />
            Services
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="services-heading"
            variants={itemVariant}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">What I </span>
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
              Do
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              desc={service.desc}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
