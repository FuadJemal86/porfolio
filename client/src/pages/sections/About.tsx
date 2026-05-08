import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { CheckCircle2, Sparkles, Zap, Code2, Globe, Cpu, Award } from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const points = [
  { text: 'Scalable Backend Architecture', icon: <Cpu className="w-4 h-4" /> },
  { text: 'Modern MERN Stack Development', icon: <Code2 className="w-4 h-4" /> },
  { text: 'AI‑Assisted Workflow & Code Quality', icon: <Sparkles className="w-4 h-4" /> },
  { text: 'Real‑world ERP & Management Systems', icon: <Globe className="w-4 h-4" /> },
];

const stats = [
  { value: '15+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
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

const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

/* -----------------------------------------------------------------
   Floating particles component
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }, (_, i) => (
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
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
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
   Gradient orb component
   ----------------------------------------------------------------- */
function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94,179,246,0.08) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/* -----------------------------------------------------------------
   About image with 3D tilt effect
   ----------------------------------------------------------------- */
function AboutImage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 1000 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.5) 0%, rgba(94,179,246,0.5) 100%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#8b5cf6]/20 bg-[#1e2024]"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 via-transparent to-[#5eb3f6]/20 z-10 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
          alt="Workstation showing a developer working on a laptop"
          className="w-full h-[240px] sm:h-[340px] md:h-[440px] lg:h-[500px] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        className="absolute -right-4 top-1/4 bg-[#1e2024] px-4 py-2 rounded-full border border-[#8b5cf6]/30 shadow-lg z-30"
        variants={floatVariant}
        animate="animate"
      >
        <span className="text-xs text-[#8b5cf6] font-semibold flex items-center gap-1">
          <Zap className="w-3 h-3" /> Developer
        </span>
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-1/3 bg-[#1e2024] px-4 py-2 rounded-full border border-[#5eb3f6]/30 shadow-lg z-30"
        variants={floatVariant}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-xs text-[#5eb3f6] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Creative
        </span>
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------------------
   Stat card component
   ----------------------------------------------------------------- */
function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.8 + index * 0.1,
        type: 'spring' as const,
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="bg-[#1e2024] border border-[#8b5cf6]/20 rounded-2xl p-4 text-center relative overflow-hidden group"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.p
        className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#5eb3f6] bg-clip-text text-transparent"
        whileHover={{ scale: 1.1 }}
      >
        {value}
      </motion.p>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Skill point component
   ----------------------------------------------------------------- */
function SkillPoint({ text, icon, index }: { text: string; icon: React.ReactNode; index: number }) {
  return (
    <motion.div
      variants={itemVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.1 }}
      whileHover={{
        x: 10,
        transition: { duration: 0.2 },
      }}
      className="flex items-center gap-3 p-3 rounded-xl bg-[#1e2024]/50 border border-transparent hover:border-[#8b5cf6]/30 transition-all duration-300 group"
    >
      <motion.div
        className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] shrink-0"
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, 0],
        }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
        {text}
      </span>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="ml-auto text-[#8b5cf6]"
      >
        <CheckCircle2 className="w-5 h-5" />
      </motion.div>
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
      className="relative py-20 sm:py-24 md:py-32 bg-[#0f0f13] overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background effects */}
      <GradientOrb />
      <FloatingParticles />

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
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Column */}
          <motion.div variants={itemVariant} className="relative order-2 lg:order-1">
            <AboutImage />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div variants={itemVariant} className="order-1 lg:order-2">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs uppercase tracking-wider mb-6"
            >
              <Award className="w-4 h-4" />
              My Story
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="about-heading"
              variants={itemVariant}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">About </span>
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
              className="text-gray-400 text-lg leading-relaxed mb-4"
            >
              I am a{' '}
              <span className="text-white font-semibold">
                Full Stack Web Developer and Software Engineer
              </span>{' '}
              passionate about building efficient, secure, and scalable software systems that make a real impact.
            </motion.p>

            <motion.p
              variants={itemVariant}
              className="text-gray-400 text-base leading-relaxed mb-8"
            >
              With over three years of hands-on experience, I specialize in designing real-world
              systems like ERPs and e-commerce platforms. My expertise lies in robust backend
              development and seamless system architecture using cutting-edge tools like Django and Node.js.
            </motion.p>

            {/* Skills list */}
            <motion.div variants={itemVariant} className="space-y-3">
              {points.map((point, i) => (
                <SkillPoint key={i} text={point.text} icon={point.icon} index={i} />
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariant} className="mt-8">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b5cf6] text-white font-semibold text-sm relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
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
        </motion.div>
      </div>
    </section>
  );
}
