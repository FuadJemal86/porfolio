import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { FolderOpen, X, ExternalLink, Github, Layers, Sparkles, Maximize2 } from 'lucide-react';

const projectFolders = [
  'A_sync',
  'alif',
  'aquaErp',
  'EmployeeManegment',
  'family',
  'hikma',
  'homeCliener',
  'jejan',
  'Kpi',
  'mishkat',
  'wcsh',
  'pm',
  'apm'
] as const;

type ProjectFolder = (typeof projectFolders)[number];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const imagesModules = import.meta.glob('../../*/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const imagesByFolder: Record<ProjectFolder, string[]> = projectFolders.reduce(
  (acc, folder) => {
    acc[folder] = [];
    return acc;
  },
  {} as Record<ProjectFolder, string[]>,
);

const folderRegex = new RegExp(`/(${projectFolders.map(escapeRegExp).join('|')})/`);
for (const [path, url] of Object.entries(imagesModules)) {
  const match = path.match(folderRegex);
  if (!match) continue;
  const folder = match[1] as ProjectFolder;
  if (!imagesByFolder[folder]) continue;
  imagesByFolder[folder].push(url);
}

for (const folder of projectFolders) {
  imagesByFolder[folder].sort();
}

type PortfolioProject = {
  folder: ProjectFolder;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageAlt: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

const defaultStack = [
  'React',
  'TypeScript',
  'Node.js',
  'Express.js',
  'Prisma',
  'shadcn/ui',
  'UI Design',
] as const;

const mobTech = [
  'flutter',
  'node.js',
  'postgres'
]

const projects: PortfolioProject[] = [
  {
    folder: 'A_sync',
    title: 'A Sync',
    shortDescription: 'Marketing site for a tech startup clear story, modern layout, and fast first impression.',
    fullDescription:
      'A_sync is a web presence built for a technology startup. It highlights the product story, team, and value proposition with a polished, responsive layout so visitors quickly understand what the company does and why it matters.',
    imageAlt: 'A Sync project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'alif',
    title: 'Alif',
    shortDescription: 'School system for teachers and students attendance, grades, and results in one place.',
    fullDescription:
      'Alif is a school management platform where teachers and students sign in with distinct roles. Teachers record attendance, release grades, and manage assessments; students log in to view their results and academic progress in a structured, easy-to-read interface.',
    imageAlt: 'Alif project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'aquaErp',
    title: 'Aqua ERP',
    shortDescription:
      'Full ERP for inventory, sales, purchases, and credit control with alerts, overdue tracking, and notifications.',
    fullDescription:
      'Aqua ERP is a comprehensive system for managing inventory, products, sales, purchases, and credit control. It supports overdue tracking, low-stock alerts, and automated notifications so operations stay visible, predictable, and under control from day to day.',
    imageAlt: 'Aqua ERP project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'apm',
    title: 'A.P.M (anonymous private messaging)',
    shortDescription: 'A.P.M  an anonymous private messaging mobile app',
    fullDescription: 'You can share your Private ID, and people can see the anonymous messages you received  without screenshots or any extra process',
    imageAlt: 'Employee Management project screenshot',
    technologies: [...mobTech],
  },
  {
    folder: 'EmployeeManegment',
    title: 'Employee Management',
    shortDescription: 'HR operations: clock in/out, tasks on a calendar, progress tracking, and payroll.',
    fullDescription:
      'A workforce portal for clock-in and clock-out, assigning tasks with calendar-based scheduling, monitoring progress over time, and supporting payroll workflows. It keeps managers and staff aligned on who is working on what and how work is advancing.',
    imageAlt: 'Employee Management project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'family',
    title: 'Locality',
    shortDescription: 'Locality-based family platform for registration, members, and community services.',
    fullDescription:
      'Locality (family system) is a locality-based family management platform. It simplifies family registration, tracks members, and connects users to community services bringing administrative work into one coherent, accessible web experience.',
    imageAlt: 'Locality family platform screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'hikma',
    title: 'Hikma University',
    shortDescription: 'Islamic university website—multilingual content, institutional story, and donations.',
    fullDescription:
      'A web platform for Hikma Islamic University that presents programs, values, and campus life. Content is available in three languages, and the site includes a donation flow so supporters can contribute to the university\'s mission directly online.',
    imageAlt: 'Hikma University project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'homeCliener',
    title: 'Home Cleaner',
    shortDescription: 'Booking for home cleaning location, home details, and online requests.',
    fullDescription:
      'Home Cleaner helps clients request cleaning services online. Customers specify where the home is located and what they need—rooms, beds, bathrooms, and other details—so providers can quote and schedule jobs without back-and-forth confusion.',
    imageAlt: 'Home Cleaner project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'jejan',
    title: 'Jejan',
    shortDescription: 'E-commerce linking customers and suppliers for listings, orders, and exchanges.',
    fullDescription:
      'Jejan is an e-commerce platform that connects customers with suppliers. It supports seamless online transactions, product discovery, and exchanges so both sides can trade efficiently through a single, modern marketplace experience.',
    imageAlt: 'Jejan e-commerce project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'Kpi',
    title: 'KPI Assign',
    shortDescription: 'SaaS for staff KPIs assign tasks, track completion with checks, and measure progress.',
    fullDescription:
      'KPI Assign is a SaaS product for assigning work to staff, giving each person a "My KPI" view, and letting them mark tasks done with check/uncheck interactions. The system evaluates progress from completed items and integrates cleanly into broader organizational workflows.',
    imageAlt: 'KPI Assign project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'mishkat',
    title: 'Mishkat',
    shortDescription:
      'Telegram library bot plus dashboard materials by year, semester, and department; easy access for students.',
    fullDescription:
      'Mishkat is a Telegram-based library bot that organizes academic materials by year, semester, and department so students can find resources quickly. A web dashboard handles uploading and managing content, keeping the library accurate and up to date.',
    imageAlt: 'Mishkat project screenshot',
    technologies: [
      'Python',
      'Telegram Bot API',
      'React',
      'TypeScript',
      'Express.js',
      'Prisma',
      'shadcn/ui',
      'UI Design',
    ],
  },
  {
    folder: 'wcsh',
    title: 'WCSH',
    shortDescription: 'Hospital website covering services, departments, and visitor information end to end.',
    fullDescription:
      'WCSH is a hospital web presence that explains services, facilities, and how to get care. The site is structured so patients and families can learn about the institution, find practical information, and navigate content confidently on any device.',
    imageAlt: 'WCSH hospital website screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'pm',
    title: 'Property Management',
    shortDescription: 'Agent-based SaaS connecting property owners and tenants leases, comms, and operations.',
    fullDescription:
      'A property management SaaS built around agents who bridge owners and tenants. It supports day-to-day rental operations, clear roles for each party, and a workflow that keeps listings, tenants, and ownership aligned in one system.',
    imageAlt: 'Property management system screenshot',
    technologies: [...defaultStack],
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
      staggerChildren: 0.08,
      delayChildren: 0.15,
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
  hidden: { opacity: 0, y: 30, scale: 0.96 },
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

// Deterministic "weird" offsets — cycled per index so the grid never sits in a neat line
const rotateFor = (i: number) => [-2, 3, -1, 2, -3, 1][i % 6];
const liftFor = (i: number) => [0, 28, -10, 18, 0, 34][i % 6];

/* -----------------------------------------------------------------
   Ambient floating particles (flat, no 3D)
   ----------------------------------------------------------------- */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 14 }, (_, i) => (
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
            y: [0, -70, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 12,
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
   Project card — outline only, staggered + rotated, no 3D
   ----------------------------------------------------------------- */
function ProjectCard({
  project,
  preview,
  index,
  onClick,
}: {
  project: PortfolioProject;
  preview: string | null;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={cardVariant}
      style={{ rotate: `${rotateFor(index)}deg`, marginTop: liftFor(index) }}
      whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
      transition={{ type: 'spring' as const, stiffness: 260, damping: 20 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className="relative group cursor-pointer"
    >
      {/* Outline-only container — no filled card background */}
      <div
        className="relative rounded-xl overflow-hidden transition-colors duration-300"
        style={{ border: '2px solid var(--line)' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video" style={{ borderBottom: '2px solid var(--line)' }}>
          {preview ? (
            <>
              <motion.img
                src={preview}
                alt={project.imageAlt}
                className="w-full h-full object-cover grayscale-[0.15]"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(10,10,10,0.5)', border: '2px solid var(--accent)' }}
                >
                  <Maximize2 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[color:var(--muted)] text-sm">
              <FolderOpen className="w-12 h-12 opacity-40" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[color:var(--muted)] text-sm sm:text-base leading-relaxed mt-3 line-clamp-2">
            {project.shortDescription}
          </p>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="font-mono-ui text-[10px] sm:text-xs px-2.5 py-1 rounded-full text-[color:var(--muted)]"
                  style={{ border: '1px solid var(--line)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Portfolio modal
   ----------------------------------------------------------------- */
function ProjectModal({
  project,
  images,
  activeImageIndex,
  onClose,
  onImageSelect,
  onFullscreen,
}: {
  project: PortfolioProject;
  images: string[];
  activeImageIndex: number;
  onClose: () => void;
  onImageSelect: (index: number) => void;
  onFullscreen: (src: string) => void;
}) {
  const mainImage = images[activeImageIndex] ?? images[0] ?? null;

  return (
    <motion.div
      className="fixed inset-0 z-50 backdrop-blur-sm"
      style={{ background: 'rgba(10,10,10,0.85)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--bg)', border: '2px solid var(--line)' }}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-5 sm:p-6 flex items-start justify-between gap-4 sticky top-0 backdrop-blur-sm z-10"
          style={{ borderBottom: '2px solid var(--line)', background: 'var(--bg)' }}
        >
          <div className="min-w-0">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[color:var(--ink)] truncate">
              {project.title}
            </h3>
          </div>

          <motion.button
            type="button"
            aria-label="Close project modal"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
            style={{ border: '2px solid var(--line)' }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left: Image */}
            <div className="w-full lg:w-[55%]">
              <div className="rounded-xl overflow-hidden" style={{ border: '2px solid var(--line)' }}>
                {mainImage ? (
                  <button
                    type="button"
                    aria-label="Open image in full screen"
                    onClick={() => onFullscreen(mainImage)}
                    className="block w-full relative group"
                  >
                    <img
                      src={mainImage}
                      alt={project.imageAlt}
                      className="w-full h-auto max-h-[44vh] object-contain"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    </div>
                  </button>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center text-[color:var(--muted)] text-sm">
                    Image not found
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((src, idx) => {
                    const isActive = idx === activeImageIndex;
                    return (
                      <motion.button
                        key={`${project.folder}-${idx}`}
                        type="button"
                        onClick={() => onImageSelect(idx)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all"
                        style={{ border: `2px solid ${isActive ? 'var(--accent)' : 'var(--line)'}` }}
                        aria-label={`Select image ${idx + 1}`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Story */}
            <div className="w-full lg:w-[45%]">
              <p className="text-[color:var(--muted)] text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-6">
                  <p
                    className="font-mono-ui text-xs uppercase tracking-widest mb-3 flex items-center gap-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    <Layers className="w-4 h-4" />
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono-ui text-xs px-3 py-1.5 rounded-full text-[color:var(--muted)]"
                        style={{ border: '1px solid var(--line)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-heading inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
                      style={{ background: 'var(--accent)', color: '#0a0a0a' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Project
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-heading inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
                      style={{ border: '2px solid var(--line)' }}
                    >
                      <Github className="w-4 h-4" />
                      GitHub Repo
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   Fullscreen image modal
   ----------------------------------------------------------------- */
function FullscreenImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-md flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,10,0.92)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen project image"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          type="button"
          aria-label="Close full screen image"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
          style={{ border: '2px solid var(--line)' }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid var(--line)' }}>
          <img
            src={src}
            alt="Full screen project"
            className="w-full h-auto max-h-[85vh] object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------
   PortfolioSection component
   ----------------------------------------------------------------- */
export function PortfolioSection() {
  const [activeFolder, setActiveFolder] = useState<ProjectFolder | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

  const activeProject = useMemo(
    () => (activeFolder ? projects.find((p) => p.folder === activeFolder) ?? null : null),
    [activeFolder],
  );

  const activeImages = useMemo(() => {
    if (!activeFolder) return [];
    return imagesByFolder[activeFolder] ?? [];
  }, [activeFolder]);

  useEffect(() => {
    if (!activeFolder) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveFolder(null);
        setFullscreenSrc(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeFolder]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeFolder]);

  useEffect(() => {
    if (!fullscreenSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenSrc(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreenSrc]);

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-labelledby="portfolio-heading"
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
          transform: 'translateX(-50%) rotate(2deg)',
          fontSize: 'clamp(3.5rem, 16vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          zIndex: 0,
        }}
      >
        MADE · SHIPPED · REAL
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 sm:mb-20"
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
            Features
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="font-mono-ui text-xs sm:text-sm uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Visit my portfolio and keep your feedback
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="portfolio-heading"
            variants={itemVariant}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[color:var(--ink)]">My </span>
            <span className="relative inline-block px-2">
              <span
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: 'var(--accent)', transform: 'rotate(-2deg)' }}
              />
              Portfolio
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariant}
            className="text-[color:var(--muted)] text-lg max-w-2xl mx-auto"
          >
            Showcasing a diverse range of projects built with modern technologies and best practices
          </motion.p>
        </motion.div>

        {/* Projects Grid — deliberately staggered, not a neat aligned grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14"
        >
          {projects.map((proj, i) => {
            const preview = imagesByFolder[proj.folder]?.[0] ?? null;
            return (
              <ProjectCard
                key={proj.folder}
                project={proj}
                preview={preview}
                index={i}
                onClick={() => setActiveFolder(proj.folder)}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            images={activeImages}
            activeImageIndex={activeImageIndex}
            onClose={() => {
              setActiveFolder(null);
              setFullscreenSrc(null);
            }}
            onImageSelect={setActiveImageIndex}
            onFullscreen={setFullscreenSrc}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreenSrc && (
          <FullscreenImageModal src={fullscreenSrc} onClose={() => setFullscreenSrc(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}