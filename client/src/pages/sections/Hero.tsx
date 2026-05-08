import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Code2, Database, Twitter, ChevronDown, Sparkles, Zap } from 'lucide-react';
import fuadpp from '../image/fuadpp.jpg';
import { SOCIAL } from '../../constants/social';

// Floating particles component
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#8b5cf6]/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated gradient orb
function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,179,246,0.1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function ProfileRing({ className = '' }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
      className={`relative z-10 ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Glow effect behind ring */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(94,179,246,0.4) 100%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating gradient ring */}
      <motion.div
        className="relative rounded-full border-[3px] sm:border-4 border-[#8b5cf6] p-2 sm:p-4 max-w-[min(88vw,420px)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated gradient border overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #8b5cf6, #5eb3f6, #8b5cf6)",
            padding: "3px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="aspect-square w-[min(82vw,380px)] sm:w-[min(70vw,420px)] md:w-[min(45vw,420px)] max-w-full mx-auto rounded-full overflow-hidden relative bg-gradient-to-br from-[#1e2024] to-[#2a2d35]">
          <motion.img
            src={fuadpp}
            alt="Fuad Jemal"
            className="w-full h-full object-cover"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        className="absolute -right-4 top-1/4 bg-[#1e2024] px-3 py-1.5 rounded-full border border-[#8b5cf6]/30 shadow-lg"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs text-[#8b5cf6] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Full Stack
        </span>
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-1/4 bg-[#1e2024] px-3 py-1.5 rounded-full border border-[#5eb3f6]/30 shadow-lg"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <span className="text-xs text-[#5eb3f6] font-semibold flex items-center gap-1">
          <Zap className="w-3 h-3" /> Creative
        </span>
      </motion.div>
    </div>
  );
}

// Animated skill badge
function SkillBadge({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.5 + index * 0.1,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1e2024] shadow-xl flex items-center justify-center text-[#8b5cf6] font-bold text-sm sm:text-base cursor-pointer relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Social link with enhanced hover
function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1e2024] shadow-xl flex items-center justify-center text-white overflow-hidden group"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#5eb3f6]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-[#8b5cf6]/50" />
      <div className="relative z-10 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </motion.a>
  );
}

// Enhanced button with shimmer effect
function ShimmerButton({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
}) {
  const isPrimary = variant === 'primary';

  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm overflow-hidden group ${isPrimary
          ? 'bg-[#8b5cf6] text-white border border-[#8b5cf6]'
          : 'bg-[#1e2024] text-[#8b5cf6] border border-white/10 hover:border-[#8b5cf6]'
        }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: '-200%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Glow for primary */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-[#8b5cf6] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
}

export function Hero() {
  const phrases = useMemo(
    () => ['Full Stack Web Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast'],
    [],
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingText = useMemo(() => {
    const phrase = phrases[phraseIndex] ?? '';
    return phrase.slice(0, charIndex);
  }, [charIndex, phraseIndex, phrases]);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? '';
    const typingSpeed = 60;
    const deletingSpeed = 40;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === phrase.length) delay = 2000;
    if (isDeleting && charIndex === 0) delay = 500;

    const t = window.setTimeout(() => {
      if (!isDeleting && charIndex === phrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }

      setCharIndex((i) => i + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[4.5rem] sm:pt-20 pb-12 sm:pb-16 bg-[#0f0f13] overflow-x-hidden"
    >
      {/* Background effects */}
      <GradientOrb />
      <FloatingParticles />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs sm:text-sm uppercase tracking-wider mb-6">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.span>
              Welcome to my world
            </span>
          </motion.div>

          {/* Mobile: photo directly under welcome line */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8 lg:hidden"
          >
            <ProfileRing />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
            <span className="block mb-2">Hi, I&apos;m</span>
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
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Fuad Jemal
            </motion.span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90">
              I&apos;m a{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#5eb3f6] bg-clip-text text-transparent">
                  {typingText}
                </span>
                <motion.span
                  className="absolute -right-1 top-0 w-[3px] h-full bg-[#8b5cf6]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              </span>
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0"
          >
            I craft exceptional digital experiences using{' '}
            <motion.span
              className="text-white font-medium"
              whileHover={{ color: '#8b5cf6' }}
            >
              Django, MERN Stack
            </motion.span>
            , and cutting-edge web technologies.
            Passionate about building efficient, secure, and scalable software solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12">
            <ShimmerButton href="#portfolio" variant="secondary">
              <Code2 className="w-4 h-4" />
              View Projects
            </ShimmerButton>
            <ShimmerButton href="#contact" variant="primary">
              Let&apos;s Talk
            </ShimmerButton>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
                Connect with me
              </p>
              <div className="flex gap-3 sm:gap-4">
                <SocialLink
                  href={SOCIAL.github}
                  label="GitHub"
                  icon={<Github className="w-5 h-5 sm:w-6 sm:h-6" />}
                />
                <SocialLink
                  href={SOCIAL.linkedin}
                  label="LinkedIn"
                  icon={<Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />}
                />
                <SocialLink
                  href={SOCIAL.x}
                  label="X"
                  icon={<Twitter className="w-5 h-5 sm:w-6 sm:h-6" />}
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
                Tech Stack
              </p>
              <div className="flex gap-3 sm:gap-4">
                <SkillBadge index={0}>
                  <Code2 className="w-5 h-5" />
                </SkillBadge>
                <SkillBadge index={1}>
                  <Database className="w-5 h-5" />
                </SkillBadge>
                <SkillBadge index={2}>JS</SkillBadge>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Desktop: photo in right column */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: 'spring' as const,
            stiffness: 50,
          }}
          className="relative hidden lg:flex justify-end"
        >
          <ProfileRing />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#8b5cf6] transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
