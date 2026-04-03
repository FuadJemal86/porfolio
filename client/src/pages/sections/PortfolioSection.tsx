import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
      'A web platform for Hikma Islamic University that presents programs, values, and campus life. Content is available in three languages, and the site includes a donation flow so supporters can contribute to the university’s mission directly online.',
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
      'KPI Assign is a SaaS product for assigning work to staff, giving each person a “My KPI” view, and letting them mark tasks done with check/uncheck interactions. The system evaluates progress from completed items and integrates cleanly into broader organizational workflows.',
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

  const mainImage = activeImages[activeImageIndex] ?? activeImages[0] ?? null;

  useEffect(() => {
    if (!activeFolder) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveFolder(null);
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
    <section id="portfolio" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#8b5cf6] text-xs sm:text-sm uppercase tracking-widest mb-2 px-2">
          Visit my portfolio and keep your feedback
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-10 sm:mb-16">My Portfolio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((proj) => {
            const preview = imagesByFolder[proj.folder]?.[0] ?? null;
            return (
              <motion.div
                key={proj.folder}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveFolder(proj.folder)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveFolder(proj.folder);
                }}
                className="bg-[#1e2024] rounded-2xl sm:rounded-3xl shadow-2xl text-left cursor-pointer overflow-hidden border border-white/5 group"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-[#191b1e]">
                    {preview ? (
                      <img
                        src={preview}
                        alt={proj.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-300 group-hover:text-[#8b5cf6] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-3 clamp-2">
                    {proj.shortDescription}
                  </p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-xs px-2 py-1 rounded-full border border-white/10 bg-[#0f1729]/40 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 bg-black/70"
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${activeProject.title}`}
            onMouseDown={() => {
              setActiveFolder(null);
              setFullscreenSrc(null);
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl max-h-[82vh] overflow-y-auto overflow-x-hidden modal-scroll rounded-2xl bg-[#121415] border border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.18 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{activeProject.title}</h3>
                </div>

                <button
                  type="button"
                  aria-label="Close project modal"
                  onClick={() => {
                    setActiveFolder(null);
                    setFullscreenSrc(null);
                  }}
                  className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e2024] border border-white/10 text-white hover:border-[#8b5cf6] transition-colors"
                >
                  X
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  {/* Desktop left: Image */}
                  <div className="w-full lg:w-[52%]">
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0f1729]">
                      {mainImage ? (
                        <button
                          type="button"
                          aria-label="Open image in full screen"
                          onClick={() => setFullscreenSrc(mainImage)}
                          className="block w-full"
                        >
                          <img
                            src={mainImage}
                            alt={activeProject.imageAlt}
                            className="w-full h-auto max-h-[44vh] object-contain bg-[#0f1729] cursor-zoom-in"
                          />
                        </button>
                      ) : (
                        <div className="w-full aspect-video flex items-center justify-center text-gray-500 text-sm">
                          Image not found
                        </div>
                      )}
                    </div>

                    {activeImages.length > 1 && (
                      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                        {activeImages.map((src, idx) => {
                          const isActive = idx === activeImageIndex;
                          return (
                            <button
                              key={`${activeProject.folder}-${idx}`}
                              type="button"
                              onClick={() => {
                                setActiveImageIndex(idx);
                              }}
                              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border transition-colors ${
                                isActive ? 'border-[#8b5cf6]' : 'border-white/10 hover:border-white/20'
                              } bg-[#0f1729]`}
                              aria-label={`Select image ${idx + 1}`}
                            >
                              <img src={src} alt="" className="w-full h-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Desktop right: Story */}
                  <div className="w-full lg:w-[48%]">
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{activeProject.fullDescription}</p>

                    {activeProject.technologies && activeProject.technologies.length > 0 && (
                      <div className="mt-6">
                        <p className="text-[#8b5cf6] text-xs uppercase tracking-widest mb-3">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-white/10 bg-[#0f1729]/40 text-gray-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeProject.liveUrl || activeProject.githubUrl) && (
                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1e2024] border border-white/10 hover:border-[#8b5cf6] transition-colors text-[#8b5cf6] font-bold text-sm"
                          >
                            View Live Project
                          </a>
                        )}
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1e2024] border border-white/10 hover:border-[#8b5cf6] transition-colors text-[#8b5cf6] font-bold text-sm"
                          >
                            GitHub Repo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreenSrc && (
          <motion.div
            className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Full screen project image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setFullscreenSrc(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              onMouseDown={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <button
                type="button"
                aria-label="Close full screen image"
                onClick={() => setFullscreenSrc(null)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e2024] border border-white/10 text-white hover:border-[#8b5cf6] transition-colors"
              >
                X
              </button>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f1729]">
                <img
                  src={fullscreenSrc}
                  alt="Full screen project"
                  className="w-full h-auto max-h-[82vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
