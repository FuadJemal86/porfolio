export const projectFolders = [
  'lssanAI',
  'ideaSpark',
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
  'apm',
] as const;

export type ProjectFolder = (typeof projectFolders)[number];

export type PortfolioProject = {
  folder: ProjectFolder;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageAlt: string;
  /** Filename fragment used as the public card preview (matched against image path) */
  coverFile?: string;
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
] as const;

const mobTech = ['Flutter', 'Node.js', 'Postgres'] as const;

export const projects: PortfolioProject[] = [
  {
    folder: 'lssanAI',
    title: 'LissanAI',
    shortDescription:
      'AI-powered custom keyboard for Ethiopian languages — Amharic voice-to-text, Fidel typing, and deep visual customization.',
    fullDescription:
      'LissanAI is a mobile keyboard built for an underserved problem: Ethiopian languages — especially Amharic — have weak support in mainstream typing and voice tools. It offers multi-language voice-to-text (English, Amharic, Arabic) with phonetic Amharic transliteration, a native Fidel/Ge\'ez phonetic typing engine with live variant suggestions, deep visual keyboard customization with live preview, a community marketplace for sharing designs, and a system-wide floating mic for dictation into any app. Technically it combines Flutter, a Node.js/Express + PostgreSQL (Prisma) backend, a native Android IME in Kotlin, multi-provider AI routing (Groq, OpenAI, Gemini) tuned per language after real accuracy testing, and a custom VAD/audio pipeline for noisy real-world conditions. The goal is closing a digital accessibility gap for tens of millions of speakers while staying a globally usable, customizable keyboard.',
    imageAlt: 'LissanAI keyboard app screenshot',
    coverFile: 'lssan.png',
    technologies: [
      'Flutter',
      'Kotlin',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Gemini',
      'OpenAI',
      'Groq',
    ],
  },
  {
    folder: 'ideaSpark',
    title: 'IdeaSpark',
    shortDescription:
      'Public project-idea platform — post ideas, get feedback, and find collaborators to build them.',
    fullDescription:
      'IdeaSpark is a public project-idea platform where people post ideas, get community feedback, and find collaborators — think Product Hunt meets a collaboration board, built lean for v1. Guests can browse the feed, ideas, and comments; signing in unlocks upvote, comment, save, collaborate, and posting. Users manage their profile and posts; admins get full CRUD plus top-posts views. Core loops include category-based idea posting with optional collaborator needs (auto-closes when the team is full), thumbs-up engagement, slide-in comments, bookmarks, share links, and a request-to-collaborate flow with Received/Sent tabs. Discovery uses debounced search and Load More pagination; profiles are public (title, bio, portfolio, location); notifications cover comments, upvotes, and collaboration decisions. The UI is sharp-edged with dark/light themes and a reactive mascot companion. Built with Prisma (UUID models) across the stack.',
    imageAlt: 'IdeaSpark project idea platform screenshot',
    technologies: [
      'React',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Node.js',
    ],
  },
  {
    folder: 'A_sync',
    title: 'A Sync',
    shortDescription: 'Marketing site for a tech startup — clear story, modern layout, and fast first impression.',
    fullDescription:
      'A_sync is a web presence built for a technology startup. It highlights the product story, team, and value proposition with a polished, responsive layout so visitors quickly understand what the company does and why it matters.',
    imageAlt: 'A Sync project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'alif',
    title: 'Alif',
    shortDescription: 'School system for teachers and students — attendance, grades, and results in one place.',
    fullDescription:
      'Alif is a school management platform where teachers and students sign in with distinct roles. Teachers record attendance, release grades, and manage assessments; students log in to view their results and academic progress in a structured, easy-to-read interface.',
    imageAlt: 'Alif project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'aquaErp',
    title: 'Aqua ERP',
    shortDescription:
      'Full ERP for inventory, sales, purchases, and credit control with alerts and overdue tracking.',
    fullDescription:
      'Aqua ERP is a comprehensive system for managing inventory, products, sales, purchases, and credit control. It supports overdue tracking, low-stock alerts, and automated notifications so operations stay visible, predictable, and under control from day to day.',
    imageAlt: 'Aqua ERP project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'apm',
    title: 'A.P.M',
    shortDescription: 'Anonymous private messaging mobile app — share a Private ID, receive messages privately.',
    fullDescription:
      'You can share your Private ID, and people can see the anonymous messages you received without screenshots or any extra process.',
    imageAlt: 'A.P.M mobile app screenshot',
    technologies: [...mobTech],
  },
  {
    folder: 'EmployeeManegment',
    title: 'Employee Management',
    shortDescription: 'HR operations: clock in/out, calendar tasks, progress tracking, and payroll.',
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
      'Locality is a locality-based family management platform. It simplifies family registration, tracks members, and connects users to community services — bringing administrative work into one coherent, accessible web experience.',
    imageAlt: 'Locality family platform screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'hikma',
    title: 'Hikma University',
    shortDescription: 'Islamic university website — multilingual content, institutional story, and donations.',
    fullDescription:
      "A web platform for Hikma Islamic University that presents programs, values, and campus life. Content is available in three languages, and the site includes a donation flow so supporters can contribute to the university's mission directly online.",
    imageAlt: 'Hikma University project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'homeCliener',
    title: 'Home Cleaner',
    shortDescription: 'Booking for home cleaning — location, home details, and online requests.',
    fullDescription:
      'Home Cleaner helps clients request cleaning services online. Customers specify where the home is located and what they need — rooms, beds, bathrooms, and other details — so providers can quote and schedule jobs without back-and-forth confusion.',
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
    shortDescription: 'SaaS for staff KPIs — assign tasks, track completion, and measure progress.',
    fullDescription:
      'KPI Assign is a SaaS product for assigning work to staff, giving each person a "My KPI" view, and letting them mark tasks done with check/uncheck interactions. The system evaluates progress from completed items and integrates cleanly into broader organizational workflows.',
    imageAlt: 'KPI Assign project screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'mishkat',
    title: 'Mishkat',
    shortDescription:
      'Telegram library bot plus dashboard — materials by year, semester, and department.',
    fullDescription:
      'Mishkat is a Telegram-based library bot that organizes academic materials by year, semester, and department so students can find resources quickly. A web dashboard handles uploading and managing content, keeping the library accurate and up to date.',
    imageAlt: 'Mishkat project screenshot',
    technologies: ['Python', 'Telegram Bot API', 'React', 'TypeScript', 'Express.js', 'Prisma'],
  },
  {
    folder: 'wcsh',
    title: 'WCSH',
    shortDescription: 'Hospital website covering services, departments, and visitor information.',
    fullDescription:
      'WCSH is a hospital web presence that explains services, facilities, and how to get care. The site is structured so patients and families can learn about the institution, find practical information, and navigate content confidently on any device.',
    imageAlt: 'WCSH hospital website screenshot',
    technologies: [...defaultStack],
  },
  {
    folder: 'pm',
    title: 'Property Management',
    shortDescription: 'Agent-based SaaS connecting property owners and tenants for leases and ops.',
    fullDescription:
      'A property management SaaS built around agents who bridge owners and tenants. It supports day-to-day rental operations, clear roles for each party, and a workflow that keeps listings, tenants, and ownership aligned in one system.',
    imageAlt: 'Property management system screenshot',
    technologies: [...defaultStack],
  },
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const imagesModules = import.meta.glob('../**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const imagesByFolder: Record<ProjectFolder, string[]> = projectFolders.reduce(
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

/** Prefer an explicit cover file as the first (public) image for a project. */
export function getProjectImages(project: PortfolioProject): string[] {
  const images = imagesByFolder[project.folder] ?? [];
  if (!project.coverFile || images.length === 0) return images;

  const cover = images.find((url) => url.includes(project.coverFile!));
  if (!cover) return images;
  return [cover, ...images.filter((url) => url !== cover)];
}

export function getProjectPreview(project: PortfolioProject): string | null {
  return getProjectImages(project)[0] ?? null;
}
