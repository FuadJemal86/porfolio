import { Download, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import fuadpp from '../image/fuadpp.jpg';
import { SOCIAL } from '../../constants/social';
import { RESUME } from '../../constants/resume';

const tags = [
  'Full Stack',
  'Django',
  'MERN',
  'Mobile Apps',
  'ERP Systems',
  'and your next big idea.',
];

function SocialItem({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--muted)] hover:text-[color:var(--text-color)] transition-colors"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

export function Hero() {
  return (
    <section id="home" className="pr-12 sm:pr-14">
      <div className="flex items-start gap-4 sm:gap-5 mb-6">
        <img
          src={fuadpp}
          alt="Fuad Jemal"
          width={224}
          height={272}
          decoding="async"
          className="profile-photo w-[5.5rem] h-[6.75rem] sm:w-28 sm:h-[8.5rem] object-cover object-[center_18%] shrink-0 border border-[color:var(--card-border)]"
        />
        <div className="min-w-0 pt-0.5">
          <h1 className="font-heading text-[1.75rem] sm:text-[2.15rem] font-bold tracking-tight leading-none mb-2.5">
            Fuad
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <SocialItem href={SOCIAL.github} label="GitHub">
              <Github className="w-3.5 h-3.5" />
            </SocialItem>
            <SocialItem href={SOCIAL.linkedin} label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </SocialItem>
            <SocialItem href={SOCIAL.x} label="X">
              <Twitter className="w-3.5 h-3.5" />
            </SocialItem>
            <SocialItem href="mailto:fuad.jemal.mail@gmail.com" label="Email">
              <Mail className="w-3.5 h-3.5" />
            </SocialItem>
          </div>
        </div>
      </div>

      <p className="text-[color:var(--muted)] text-[15px] sm:text-base leading-relaxed max-w-2xl mb-5">
      Full Stack Developer building websites, mobile apps, and SaaS products with Django and the MERN stack. I move fast without cutting corners, and I'm open to freelance projects.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, i) => (
          <span key={tag} className={i === tags.length - 1 ? 'pill pill-accent' : 'pill'}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2.5">
        <a
          href={RESUME.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
        <a href="#work" className="btn-ghost">
          View my work
        </a>
        <a href="#contact" className="btn-ghost">
          Contact me
        </a>
      </div>
    </section>
  );
}
