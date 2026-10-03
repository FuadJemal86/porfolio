import { motion, type Variants } from 'framer-motion';
import { Award, Download, FileText } from 'lucide-react';

/* -----------------------------------------------------------------
   Static data
   ----------------------------------------------------------------- */
const skillGroups = [
  {
    title: 'Backend',
    skills: ['Django', 'Node.js', 'REST APIs', 'Auth Systems', 'Docker', 'CI/CD'],
    style: 'filled' as const,
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Tailwind', 'Formik', 'Dynamic UI'],
    style: 'outline' as const,
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma'],
    style: 'stamp' as const,
  },
];

// Deterministic pseudo-random angle per index so layout doesn't jump on re-render
const angleFor = (i: number) => ((i * 47) % 13) - 6;

/* -----------------------------------------------------------------
   Animation variants
   ----------------------------------------------------------------- */
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 12 },
  },
};

const groupVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const tagVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 16 },
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
            background: 'var(--accent-soft)',
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
   A single skill tag — pill, stamp, or handwritten-outline, never boxed in a card
   ----------------------------------------------------------------- */
function SkillTag({ skill, style, rotate }: { skill: string; style: 'filled' | 'outline' | 'stamp'; rotate: number }) {
  const base = 'font-mono-ui text-xs sm:text-sm px-3.5 py-1.5 inline-flex items-center select-none';

  if (style === 'filled') {
    return (
      <motion.span
        variants={tagVariant}
        whileHover={{ scale: 1.12, rotate: 0 }}
        style={{ rotate: `${rotate}deg`, background: 'var(--accent)', color: 'var(--button-fg)' }}
        className={`${base} rounded-full font-semibold`}
      >
        {skill}
      </motion.span>
    );
  }

  if (style === 'stamp') {
    return (
      <motion.span
        variants={tagVariant}
        whileHover={{ scale: 1.12, rotate: 0 }}
        style={{
          rotate: `${rotate}deg`,
          border: '2px double var(--accent)',
          color: 'var(--accent)',
        }}
        className={`${base} rounded-md uppercase tracking-wider text-[10px] sm:text-xs`}
      >
        {skill}
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={tagVariant}
      whileHover={{ scale: 1.12, rotate: 0 }}
      style={{ rotate: `${rotate}deg`, border: '1.5px dashed var(--line)', color: 'var(--ink)' }}
      className={`${base} rounded-full`}
    >
      {skill}
    </motion.span>
  );
}

/* -----------------------------------------------------------------
   Skill group — a hand-labeled cluster of scattered tags, no card container
   ----------------------------------------------------------------- */
function SkillGroup({
  title,
  skills,
  style,
  labelRotate,
}: {
  title: string;
  skills: string[];
  style: 'filled' | 'outline' | 'stamp';
  labelRotate: number;
}) {
  return (
    <motion.div variants={groupVariant} className="relative">
      <div
        className="relative inline-block mb-5"
        style={{ rotate: `${labelRotate}deg` }}
      >
        <span className="font-heading text-2xl sm:text-3xl font-bold text-[color:var(--ink)]">
          {title}
        </span>
        <svg
          viewBox="0 0 120 12"
          className="absolute -bottom-1 left-0 w-full h-3"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M2 8 Q 30 2, 60 7 T 118 5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 pl-1">
        {skills.map((skill, i) => (
          <SkillTag key={skill} skill={skill} style={style} rotate={angleFor(i)} />
        ))}
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Torn-paper zigzag divider
   ----------------------------------------------------------------- */
function TornDivider() {
  return (
    <svg
      viewBox="0 0 400 16"
      className="w-full h-4 my-12 sm:my-16"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points="0,8 20,2 40,14 60,4 80,12 100,2 120,10 140,4 160,14 180,2 200,10 220,4 240,12 260,2 280,10 300,4 320,14 340,2 360,10 380,4 400,8"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
    </svg>
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
      whileHover={{ scale: 1.04, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      style={{ background: 'var(--accent)', color: 'var(--button-fg)', rotate: '-1deg' }}
      className="font-heading inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
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
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--section-bg)' }}
      aria-labelledby="resume-heading"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px),
                           linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Oversized watermark word */}
      <div
        aria-hidden
        className="font-heading absolute select-none pointer-events-none whitespace-nowrap font-bold"
        style={{
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          fontSize: 'clamp(3.5rem, 16vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px var(--watermark-stroke)',
          zIndex: 0,
        }}
      >
        SKILLS · STACK · TOOLS
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-4"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariant}
            className="font-mono-ui inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-wider mb-6"
            style={{
              background: 'var(--accent-soft)',
              borderColor: 'var(--accent-ring)',
              color: 'var(--accent)',
              rotate: '2deg',
            }}
          >
            <Award className="w-4 h-4" />
            3+ Years of Experience
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="resume-heading"
            variants={itemVariant}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[color:var(--ink)]">My </span>
            <span className="relative inline-block px-2 text-[color:var(--button-fg)]">
              <span
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: 'var(--accent)', transform: 'rotate(-2deg)' }}
              />
              Resume
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-lg max-w-2xl mx-auto mb-8"
          >
            A comprehensive overview of my technical expertise and professional skills
          </motion.p>

          {/* Download button */}
          <ResumeButton />
        </motion.div>

        <TornDivider />

        {/* Skills — scattered clusters, not cards */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12 sm:space-y-14"
        >
          {skillGroups.map((group, i) => (
            <div key={group.title}>
              <SkillGroup
                title={group.title}
                skills={group.skills}
                style={group.style}
                labelRotate={i % 2 === 0 ? -2 : 2}
              />
              {i < skillGroups.length - 1 && <TornDivider />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}