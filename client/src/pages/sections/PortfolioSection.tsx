import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

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
] as const;

type ProjectFolder = (typeof projectFolders)[number];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const imagesModules = import.meta.glob('../../*/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Group images by top-level project folder name (right after `src/`).
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

// Keep preview ordering stable.
for (const folder of projectFolders) {
  imagesByFolder[folder].sort();
}

const projects: Array<{
  folder: ProjectFolder;
  title: string;
  cat: string;
}> = [
  { folder: 'A_sync', title: 'A Sync', cat: 'Management Platform' },
  { folder: 'alif', title: 'Alif', cat: 'Education Tech' },
  { folder: 'aquaErp', title: 'Aqua ERP', cat: 'Business Solution' },
  { folder: 'EmployeeManegment', title: 'Employee Management', cat: 'Operations' },
  { folder: 'family', title: 'Family', cat: 'Web App' },
  { folder: 'hikma', title: 'Hikma', cat: 'System' },
  { folder: 'homeCliener', title: 'Home Cleaner', cat: 'Service Platform' },
  { folder: 'jejan', title: 'Jejan', cat: 'E-Commerce' },
  { folder: 'Kpi', title: 'KPI', cat: 'Automation' },
  { folder: 'mishkat', title: 'Mishkat', cat: 'Web App' },
  { folder: 'wcsh', title: 'WCSH', cat: 'Management' },
];

export function PortfolioSection() {
  const [active, setActive] = useState<ProjectFolder | null>(null);

  const activeImages = useMemo(() => {
    if (!active) return [];
    return imagesByFolder[active] ?? [];
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  const activeProject = active ? projects.find((p) => p.folder === active) : null;

  return (
    <section id="portfolio" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#ff014f] text-xs sm:text-sm uppercase tracking-widest mb-2 px-2">
          Visit my portfolio and keep your feedback
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-10 sm:mb-16">My Portfolio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((proj) => {
            const preview = imagesByFolder[proj.folder]?.[0];
            return (
              <motion.div
                key={proj.folder}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActive(proj.folder)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActive(proj.folder);
                }}
                className="bg-[#1e2024] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl text-left group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6 aspect-video bg-[#191b1e]">
                  {preview ? (
                    <img
                      src={preview}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      No preview
                    </div>
                  )}
                </div>
                <p className="text-[#ff014f] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">{proj.cat}</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 group-hover:text-[#ff014f] transition-colors">
                  {proj.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>

      {active && activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label={`Project gallery: ${activeProject.title}`}
          onMouseDown={() => setActive(null)}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl max-h-[82vh] overflow-y-auto overflow-x-hidden modal-scroll rounded-2xl bg-[#121415] border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[#ff014f] text-xs sm:text-sm uppercase tracking-widest mb-1">{activeProject.cat}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{activeProject.title}</h3>
                <p className="text-gray-400 text-sm mt-2">
                  {activeImages.length} image{activeImages.length === 1 ? '' : 's'}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close gallery"
                onClick={() => setActive(null)}
                className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e2024] border border-white/10 text-white hover:border-[#ff014f] transition-colors"
              >
                X
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {activeImages.length === 0 ? (
                <div className="text-gray-400 text-sm">No images found in this folder.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {activeImages.map((src, idx) => (
                    <div
                      key={`${activeProject.folder}-${idx}`}
                      className="rounded-xl overflow-hidden border border-white/10 bg-[#0f1729]"
                    >
                      <img src={src} alt={`${activeProject.title} - image ${idx + 1}`} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
