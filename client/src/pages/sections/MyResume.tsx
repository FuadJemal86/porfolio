import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { Award, CheckCircle2, Download, FileText } from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const skillGroups = [
  {
    title: 'Backend',
    skills: ['Django', 'Node.js', 'REST APIs', 'Auth Systems', 'Docker', 'CI/CD'],
    color: '#8b5cf6',
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Tailwind', 'Formik', 'Dynamic UI'],
    color: '#5eb3f6',
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma'],
    color: '#a78bfa',
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
      staggerChildren: 0.15,
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

const skillItemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
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
   Skill card with 3D tilt effect
   ----------------------------------------------------------------- */
function SkillCard({
  title,
  skills,
  color,
  index,
}: {
  title: string;
  skills: string[];
  color: string;
  index: number;
}) {
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
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}60 0%, ${color}40 100%)`,
        }}
      />

      {/* Card */}
      <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-[#1e2024] border border-[#8b5cf6]/10 shadow-xl overflow-hidden group-hover:border-[#8b5cf6]/30 transition-all duration-500">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)` }}
        />

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-6 pb-3 border-b transition-colors"
          style={{ color, borderColor: 'rgba(139, 92, 246, 0.1)' }}
        >
          {title}
        </h3>

        {/* Skills list */}
        <motion.ul
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              variants={skillItemVariant}
              custom={i}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-default"
            >
              <motion.div
                className="w-2 h-2 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-sm sm:text-base">{skill}</span>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="ml-auto text-[#8b5cf6]"
              >
                <CheckCircle2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Resume download button
   ----------------------------------------------------------------- */
function ResumeButton() {
  return (
    <motion.a
      href="#"
      variants={itemVariant}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b5cf6] text-white font-semibold text-sm relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: '-200%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8 }}
      />
      <FileText className="w-4 h-4 relative z-10" />
      <span className="relative z-10">Download Resume</span>
      <motion.span
        className="relative z-10"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Download className="w-4 h-4" />
      </motion.span>
    </motion.a>
  );
}

/* -----------------------------------------------------------------
   MyResume component
   ----------------------------------------------------------------- */
export function MyResume() {
  return (
    <section
      id="resume"
      className="relative py-20 sm:py-24 md:py-32 bg-[#0f0f13] overflow-hidden"
      aria-labelledby="resume-heading"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(94,179,246,0.06) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
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
            <Award className="w-4 h-4" />
            3+ Years of Experience
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="resume-heading"
            variants={itemVariant}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">My </span>
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
              Resume
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
          >
            A comprehensive overview of my technical expertise and professional skills
          </motion.p>

          {/* Download button */}
          <ResumeButton />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {skillGroups.map((group, i) => (
            <SkillCard
              key={i}
              title={group.title}
              skills={group.skills}
              color={group.color}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
