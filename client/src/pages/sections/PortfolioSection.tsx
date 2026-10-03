import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, FolderOpen, Github, X } from 'lucide-react';
import { imagesByFolder, projects, type PortfolioProject, type ProjectFolder } from '../../data/projects';

function ProjectCard({
  project,
  preview,
  onOpen,
}: {
  project: PortfolioProject;
  preview: string | null;
  onOpen: () => void;
}) {
  return (
    <article className="grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-7 items-start py-10 first:pt-8 border-t border-[color:var(--card-border)]">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-xl border border-[color:var(--card-border)] bg-[color:var(--body-bg)] aspect-[16/10] text-left"
      >
        {preview ? (
          <img
            src={preview}
            alt={project.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[color:var(--muted)]">
            <FolderOpen className="w-8 h-8 opacity-50" />
          </div>
        )}
      </button>

      <div className="min-w-0 md:pt-1">
        <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-[color:var(--muted)] text-[14px] sm:text-[15px] leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1 text-[13px] text-[color:var(--text-color)] hover:text-[color:var(--button-bg)] transition-colors mb-4"
        >
          View details
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {project.technologies && project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <li key={tech} className="pill !text-[11px] !py-1 !px-2.5">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {(project.liveUrl || project.githubUrl) ? (
            <>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost !py-1.5 !px-3 !text-[12px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost !py-1.5 !px-3 !text-[12px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
              )}
            </>
          ) : (
            <button type="button" onClick={onOpen} className="btn-ghost !py-1.5 !px-3 !text-[12px]">
              Details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  images,
  onClose,
}: {
  project: PortfolioProject;
  images: string[];
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[activeIndex] ?? images[0] ?? null;

  useEffect(() => {
    setActiveIndex(0);
  }, [project.folder]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'var(--overlay)' }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-[color:var(--section-bg)] border border-[color:var(--card-border)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-4 sm:px-6 border-b border-[color:var(--card-border)] bg-[color:var(--section-bg)]">
          <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <button type="button" aria-label="Close" onClick={onClose} className="icon-btn">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {mainImage && (
            <div className="rounded-xl border border-[color:var(--card-border)] overflow-hidden bg-[color:var(--body-bg)]">
              <img
                src={mainImage}
                alt={project.imageAlt}
                className="w-full max-h-[50vh] object-contain"
              />
            </div>
          )}

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={`${project.folder}-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Image ${idx + 1}`}
                  className="shrink-0 w-16 h-16 overflow-hidden rounded-lg border"
                  style={{
                    borderColor: idx === activeIndex ? 'var(--button-bg)' : 'var(--card-border)',
                  }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <p className="text-[color:var(--muted)] text-[15px] leading-relaxed">
            {project.fullDescription}
          </p>

          {project.technologies && project.technologies.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="pill !text-[11px]">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-solid"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeFolder, setActiveFolder] = useState<ProjectFolder | null>(null);

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
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveFolder(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeFolder]);

  return (
    <section id="work" className="mt-10 sm:mt-12" aria-label="Projects">
      {projects.map((project) => (
        <ProjectCard
          key={project.folder}
          project={project}
          preview={imagesByFolder[project.folder]?.[0] ?? null}
          onOpen={() => setActiveFolder(project.folder)}
        />
      ))}

      {activeProject && (
        <ProjectModal
          project={activeProject}
          images={activeImages}
          onClose={() => setActiveFolder(null)}
        />
      )}
    </section>
  );
}
