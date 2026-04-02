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

const projects: PortfolioProject[] = [
  {
    folder: 'A_sync',
    title: 'A Sync',
    shortDescription: 'A clean management experience designed for faster workflows and clearer progress.',
    fullDescription:
      'A Sync is built around one idea: make everyday operations feel simple. The project focuses on clean UI structure, consistent state handling, and a smooth user journey across modules so teams can move from “start” to “done” without friction. I focused on readable components, thoughtful spacing, and practical interactions that feel natural on both desktop and mobile.',
    imageAlt: 'A Sync project screenshot',
    technologies: ['React', 'Tailwind', 'API Integration', 'Responsive UI'],
  },
  {
    folder: 'alif',
    title: 'Alif',
    shortDescription: 'Education-focused UI for organizing learning content and tracking progress.',
    fullDescription:
      'Alif brings structure to learning. This project emphasizes clean layouts, user-friendly navigation, and content-first presentation. The goal is to help students and admins quickly find what they need, while keeping the interface modern, minimal, and easy to maintain.',
    imageAlt: 'Alif project screenshot',
    technologies: ['React', 'Component Design', 'Responsive Layout'],
  },
  {
    folder: 'aquaErp',
    title: 'Aqua ERP',
    shortDescription: 'An ERP-style system built for practical business operations and reporting.',
    fullDescription:
      'Aqua ERP is designed to support real operations: organized data, consistent screens, and a user experience that makes complex processes feel understandable. I paid attention to the “story” of the app—how users navigate from overview to details—while keeping the UI calm and professional.',
    imageAlt: 'Aqua ERP project screenshot',
    technologies: ['ERP Modules', 'Dashboards', 'API-Driven UI'],
  },
  {
    folder: 'EmployeeManegment',
    title: 'Employee Management',
    shortDescription: 'A structured platform for employee data with clear flows and clean presentation.',
    fullDescription:
      'This project focuses on employee management with a strong emphasis on clarity. The interface is designed to reduce confusion, make key information easy to scan, and keep interactions predictable. The result is a modern UI that feels efficient for everyday use.',
    imageAlt: 'Employee Management project screenshot',
    technologies: ['Data Views', 'Forms', 'Responsive UX'],
  },
  {
    folder: 'family',
    title: 'Family',
    shortDescription: 'A personal web experience that keeps important content organized and accessible.',
    fullDescription:
      'Family is a personal-feel web application designed to keep important information organized. I aimed for a minimal UI with smooth spacing, readable typography, and a layout that makes browsing feel comfortable—especially on small screens.',
    imageAlt: 'Family project screenshot',
    technologies: ['Frontend UI', 'Clean Components', 'Responsive Design'],
  },
  {
    folder: 'hikma',
    title: 'Hikma',
    shortDescription: 'A modern interface for system features with an elegant, focused layout.',
    fullDescription:
      'Hikma is all about focused user experience. The design stays minimal while still giving enough structure for users to understand where they are and what to do next. I paid attention to visual hierarchy, spacing, and interaction feedback for a calm “portfolio-level” feel.',
    imageAlt: 'Hikma project screenshot',
    technologies: ['UX Hierarchy', 'UI Consistency', 'Responsive Web'],
  },
  {
    folder: 'homeCliener',
    title: 'Home Cleaner',
    shortDescription: 'A service-oriented platform with a clean booking and browsing experience.',
    fullDescription:
      'Home Cleaner is designed around services and scheduling. The UI aims to be simple and inviting, with card-based sections and clear action areas. The project balances modern styling with practical functionality so customers can browse and book quickly.',
    imageAlt: 'Home Cleaner project screenshot',
    technologies: ['Service Cards', 'Responsive UI', 'Clean Navigation'],
  },
  {
    folder: 'jejan',
    title: 'Jejan E-Commerce',
    shortDescription: 'An e-commerce experience centered on product discovery and smooth checkout flow.',
    fullDescription:
      'Jejan is built with a focus on product discovery and clean presentation. The UI design is structured to help users explore items comfortably, understand details quickly, and move forward with confidence. I built this with a portfolio mindset: strong visuals, readable content, and careful spacing.',
    imageAlt: 'Jejan E-Commerce project screenshot',
    technologies: ['E-Commerce UI', 'Product Cards', 'Responsive Layout'],
  },
  {
    folder: 'Kpi',
    title: 'KPI',
    shortDescription: 'KPI tracking visuals with an emphasis on readability and clean data presentation.',
    fullDescription:
      'The KPI project focuses on making important metrics easy to understand. The UI is kept minimal, with hierarchy and spacing that guide attention. I aimed for a dashboard-like structure without making it feel heavy—clean cards and readable typography.',
    imageAlt: 'KPI project screenshot',
    technologies: ['Metrics Layout', 'Readable UI', 'Cards & Tables'],
  },
  {
    folder: 'mishkat',
    title: 'Mishkat',
    shortDescription: 'A web app interface with a thoughtful structure and consistent visual rhythm.',
    fullDescription:
      'Mishkat is about consistent structure and a modern feel. The interface uses clean component patterns, clear navigation, and comfortable text presentation. The result is a professional portfolio-style experience that stays easy to use.',
    imageAlt: 'Mishkat project screenshot',
    technologies: ['Component System', 'Responsive UI', 'Clean Typography'],
  },
  {
    folder: 'wcsh',
    title: 'WCSH',
    shortDescription: 'A management-focused platform built with clarity, speed, and a clean UI mindset.',
    fullDescription:
      'WCSH is designed to make management workflows feel clear and organized. The UI keeps attention on actions and essential information, with a calm visual style and careful spacing. The goal is a professional project experience that looks great on any screen size.',
    imageAlt: 'WCSH project screenshot',
    technologies: ['Management UI', 'Workflow Design', 'Responsive UX'],
  },
  {
    folder: 'pm',
    title: 'PM',
    shortDescription: 'A personal project focused on clean structure, smooth UX, and clear presentation.',
    fullDescription:
      'PM is built with a portfolio mindset: minimal UI, clean spacing, and readable content. The project emphasizes user experience flow, consistent components, and a modern visual rhythm so the interface feels calm and professional on every screen.',
    imageAlt: 'PM project screenshot',
    technologies: ['UI Structure', 'Responsive UX', 'Clean Components'],
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
        <p className="text-[#ff014f] text-xs sm:text-sm uppercase tracking-widest mb-2 px-2">
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-300 group-hover:text-[#ff014f] transition-colors">
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
                  className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e2024] border border-white/10 text-white hover:border-[#ff014f] transition-colors"
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
                                isActive ? 'border-[#ff014f]' : 'border-white/10 hover:border-white/20'
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
                        <p className="text-[#ff014f] text-xs uppercase tracking-widest mb-3">Technologies</p>
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
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1e2024] border border-white/10 hover:border-[#ff014f] transition-colors text-[#ff014f] font-bold text-sm"
                          >
                            View Live Project
                          </a>
                        )}
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1e2024] border border-white/10 hover:border-[#ff014f] transition-colors text-[#ff014f] font-bold text-sm"
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
                className="absolute -top-3 -right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e2024] border border-white/10 text-white hover:border-[#ff014f] transition-colors"
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
