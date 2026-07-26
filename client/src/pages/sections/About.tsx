import { motion, type Variants } from 'framer-motion';
import {
  Award,
  Smartphone,
  Globe,
  Cloud,
  Sparkles,
  Database,
  Zap,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building2,
  Stethoscope,
  MapPin,
  Users,
  Quote,
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

const education = [
  {
    school: 'Jimma University',
    degree: 'BSc in Information Science',
    period: '2026',
    text: "Four years of formal grounding in how information actually moves — databases, systems analysis, and software design — that turned what I'd already been building on my own into something I could reason about properly.",
    icon: <GraduationCap className="w-5 h-5" />,
    rotate: -2,
  },
  {
    school: 'ALX Africa',
    degree: 'Software Engineering — Django Specialization',
    period: '2025',
    text: "A hands-on, project-first program that pushed me to ship real backend systems in Django under real deadlines. This is where I stopped just knowing Python and started building with it.",
    icon: <BookOpen className="w-5 h-5" />,
    rotate: 2,
  },
];

const workHistory = [
  {
    company: 'Sheira Community',
    location: 'Remote',
    role: 'Mentor',
    period: '2025 — 2026',
    text: "Mentored aspiring developers coming up through the Sheira community, walking them through real code, real bugs, and the habits that actually matter — the same way people once did for me. Teaching it turned out to sharpen my own fundamentals just as much.",
    icon: <Users className="w-5 h-5" />,
    rotate: -2,
  },
  {
    company: 'Usifay AI',
    location: 'Australia (Remote)',
    role: 'Full Stack Developer',
    period: '2025',
    text: "Built and maintained full stack features for an Australian AI company, working across the frontend and backend to ship product for a client thousands of miles away — a crash course in async collaboration and writing code that has to just work, no matter the time zone.",
    icon: <Sparkles className="w-5 h-5" />,
    rotate: -3,
  },
  {
    company: 'Async Technology',
    location: 'Remote',
    role: 'Full Stack Developer',
    period: '2025',
    text: "Worked on end-to-end product features, from API design to the interfaces people actually clicked on. This is where shipping fast without breaking things became less of a goal and more of a habit.",
    icon: <Building2 className="w-5 h-5" />,
    rotate: 2,
  },
  {
    company: 'Werabe Comprehensive Specialized Hospital',
    location: 'Werabe, Ethiopia',
    role: 'Full Stack Developer',
    period: '2024',
    text: "Built internal software for a real hospital handling real patients — where a bug isn't just an inconvenience, it's someone's care getting delayed. That weight is what taught me to test twice and ship once.",
    icon: <Stethoscope className="w-5 h-5" />,
    rotate: -1,
  },
];

const testimonials = [
  {
    quote:
      "Fuad contributed to developing and improving our company website, demonstrating strong technical skills, creativity, and attention to detail. He consistently met deadlines, communicated effectively, and showed initiative in solving problems — quickly understanding project requirements and delivering responsive, well-structured web solutions that added real value to our team.",
    author: 'Kahlid',
    role: 'Software Developer, Async',
    period: 'Jan — Mar 2025 · Website Development Internship',
    rotate: -1,
  },
  {
    quote:
      "Fuad was dedicated to his work at Werabe Comprehensive Specialized Hospital, consistently showing up with focus and reliability. He communicated clearly with the team, made sure requirements were understood before writing a line of code, and delivered software our staff could actually depend on.",
    author: 'WCSH',
    role: 'Werabe Comprehensive Specialized Hospital',
    period: '2024 · Full Stack Developer',
    rotate: 1,
  },
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
        style={{ border: '1px solid var(--line)', color: 'var(--accent)' }}
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
   Section label — small eyebrow used above Education / Work History
   ----------------------------------------------------------------- */
function SectionEyebrow({
  icon,
  label,
  rotate = -2,
}: {
  icon: React.ReactNode;
  label: string;
  rotate?: number;
}) {
  return (
    <div
      className="font-mono-ui inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-wider mb-6"
      style={{
        background: 'rgba(201,255,77,0.08)',
        borderColor: 'rgba(201,255,77,0.3)',
        color: 'var(--accent)',
        rotate: `${rotate}deg`,
      }}
    >
      {icon}
      {label}
    </div>
  );
}

/* -----------------------------------------------------------------
   Education card — scrapbook sticker style, matches CapabilityCard
   ----------------------------------------------------------------- */
function EducationCard({
  school,
  degree,
  period,
  text,
  icon,
  rotate,
}: (typeof education)[number]) {
  return (
    <motion.div
      variants={itemVariant}
      whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 18 }}
      style={{
        rotate: `${rotate}deg`,
        background: 'var(--bg)',
        border: '2px solid var(--line)',
        boxShadow: '6px 6px 0 rgba(201,255,77,0.9)',
      }}
      className="rounded-2xl p-6 relative"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ border: '1px solid var(--line)', color: 'var(--accent)' }}
        >
          {icon}
        </div>
        <span
          className="font-mono-ui text-[11px] uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0"
          style={{ border: '1px dashed var(--line)', color: 'var(--muted)' }}
        >
          {period}
        </span>
      </div>
      <h3 className="font-heading text-lg font-bold text-[color:var(--ink)] mb-1">
        {school}
      </h3>
      <p
        className="font-mono-ui text-xs uppercase tracking-wide mb-3"
        style={{ color: 'var(--accent)' }}
      >
        {degree}
      </p>
      <p className="text-[color:var(--muted)] text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Work history item — vertical timeline (order carries real meaning here)
   ----------------------------------------------------------------- */
function WorkItem({
  company,
  location,
  role,
  period,
  text,
  icon,
  isLast,
}: (typeof workHistory)[number] & { isLast: boolean }) {
  return (
    <motion.div variants={itemVariant} className="relative pl-14 pb-10">
      {!isLast && (
        <span
          className="absolute left-[19px] top-11 bottom-0 w-px"
          style={{ background: 'var(--line)', opacity: 0.5 }}
          aria-hidden
        />
      )}
      <div
        className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: 'var(--bg)',
          border: '2px solid var(--line)',
          color: 'var(--accent)',
          boxShadow: '3px 3px 0 rgba(201,255,77,0.9)',
        }}
      >
        {icon}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
        <h3 className="font-heading text-lg font-bold text-[color:var(--ink)]">
          {role}
        </h3>
        <span className="font-mono-ui text-xs uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
          {period}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5">
        <span className="text-[color:var(--ink)] font-semibold text-sm">{company}</span>
        <span className="text-[color:var(--muted)] text-sm inline-flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {location}
        </span>
      </div>
      <p className="text-[color:var(--muted)] text-sm leading-relaxed max-w-2xl">
        {text}
      </p>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Testimonial card — recommendation letter, scrapbook sticky-note style
   ----------------------------------------------------------------- */
function TestimonialCard({
  quote,
  author,
  role,
  period,
  rotate,
}: (typeof testimonials)[number]) {
  return (
    <motion.div
      variants={itemVariant}
      style={{
        rotate: `${rotate}deg`,
        background: 'var(--bg)',
        border: '2px solid var(--line)',
        boxShadow: '6px 6px 0 rgba(201,255,77,0.9)',
      }}
      className="rounded-2xl p-7 sm:p-8 relative flex-1 min-w-0 sm:max-w-md"
    >
      <Quote
        className="w-8 h-8 mb-4"
        style={{ color: 'var(--accent)' }}
        strokeWidth={1.5}
      />
      <p className="text-[color:var(--ink)] text-base sm:text-lg leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-heading font-bold text-[color:var(--ink)] text-sm">
          {author}
        </span>
        <span className="text-[color:var(--muted)] text-sm">{role}</span>
      </div>
      <span
        className="font-mono-ui text-[11px] uppercase tracking-wider inline-block mt-2 px-3 py-1 rounded-full"
        style={{ border: '1px dashed var(--line)', color: 'var(--muted)' }}
      >
        {period}
      </span>
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
            className="flex flex-wrap items-center gap-5 mb-20"
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

          {/* ---------------------------------------------------------- */}
          {/* Education                                                   */}
          {/* ---------------------------------------------------------- */}
          <motion.div variants={itemVariant}>
            <SectionEyebrow icon={<GraduationCap className="w-4 h-4" />} label="Education" rotate={-2} />
          </motion.div>

          <motion.h3
            variants={itemVariant}
            className="font-heading text-2xl sm:text-3xl font-bold text-[color:var(--ink)] mb-8 max-w-2xl"
          >
            Where the fundamentals came from.
          </motion.h3>

          <motion.div
            variants={containerVariant}
            className="grid sm:grid-cols-2 gap-8 mb-20"
          >
            {education.map((ed) => (
              <EducationCard key={ed.school} {...ed} />
            ))}
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* Work History                                               */}
          {/* ---------------------------------------------------------- */}
          <motion.div variants={itemVariant}>
            <SectionEyebrow icon={<Briefcase className="w-4 h-4" />} label="Work History" rotate={2} />
          </motion.div>

          <motion.h3
            variants={itemVariant}
            className="font-heading text-2xl sm:text-3xl font-bold text-[color:var(--ink)] mb-10 max-w-2xl"
          >
            Where the fundamentals got tested.
          </motion.h3>

          <motion.div variants={containerVariant} className="mb-16 max-w-3xl">
            {workHistory.map((job, i) => (
              <WorkItem key={job.company} {...job} isLast={i === workHistory.length - 1} />
            ))}
          </motion.div>

          {/* Recommendation letters */}
          <motion.div variants={containerVariant} className="mb-14 flex flex-col sm:flex-row gap-8 items-start">
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariant}
            style={{
              rotate: '-1deg',
              background: 'var(--bg)',
              // border: '2px solid var(--line)',
              // boxShadow: '6px 6px 0 rgba(201,255,77,0.9)',
            }}
            className="rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >


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