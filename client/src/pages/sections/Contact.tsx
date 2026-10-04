import { type FormEvent, useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SOCIAL } from '../../constants/social';

type ContactStatus =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | null;

function formatEmailJsError(err: unknown): string {
  const fallback = 'Failed to send message. Please try again in a moment.';
  if (typeof err === 'string' && err.trim()) {
    return err.length > 320 ? `${err.slice(0, 320)}…` : err;
  }
  if (err && typeof err === 'object' && 'text' in err) {
    const raw = String((err as { text?: string }).text ?? '').trim();
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw) as { message?: string; error?: string };
      const detail = (parsed.message || parsed.error || raw).trim();
      return detail.length > 320 ? `${detail.slice(0, 320)}…` : detail;
    } catch {
      return raw.length > 320 ? `${raw.slice(0, 320)}…` : raw;
    }
  }
  if (err instanceof Error && err.message) {
    return err.message.length > 320 ? `${err.message.slice(0, 320)}…` : err.message;
  }
  return fallback;
}

export function Contact() {
  const emailjsRecipientEmail = 'fuad47722@gmail.com';
  const emailjsServiceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined)?.trim();
  const emailjsTemplateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined)?.trim();
  const emailjsPublicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);

  const isConfigured = useMemo(
    () => Boolean(emailjsServiceId && emailjsTemplateId && emailjsPublicKey),
    [emailjsServiceId, emailjsTemplateId, emailjsPublicKey],
  );

  useEffect(() => {
    if (!emailjsPublicKey) return;
    emailjs.init({ publicKey: emailjsPublicKey });
  }, [emailjsPublicKey]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (trimmedMessage.length < 5) {
      setStatus({ type: 'error', message: 'Please enter a short message.' });
      return;
    }
    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured yet. Email me directly instead.',
      });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        emailjsServiceId!,
        emailjsTemplateId!,
        {
          to_email: emailjsRecipientEmail,
          from_name: trimmedName,
          from_email: trimmedEmail,
          reply_to: trimmedEmail,
          message: trimmedMessage,
        },
        { publicKey: emailjsPublicKey! },
      );
      setStatus({ type: 'success', message: 'Message sent — thanks for reaching out.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      if (import.meta.env.DEV) console.error('EmailJS send failed:', err);
      setStatus({ type: 'error', message: formatEmailJsError(err) });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'w-full rounded-none px-3.5 py-2.5 text-sm outline-none bg-[color:var(--body-bg)] border border-[color:var(--card-border)] text-[color:var(--text-color)] placeholder:text-[color:var(--muted)] focus:border-[color:var(--button-bg)] transition-colors';

  return (
    <footer id="contact" className="border-t border-[color:var(--card-border)] pt-10 mt-2">
      <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight mb-2">
        Let&apos;s talk
      </h2>
      <p className="text-[color:var(--muted)] text-[15px] leading-relaxed mb-6 max-w-xl">
        Have a project in mind? Send a note — or reach me directly.
      </p>

      <a
        href="mailto:fuad.jemal.mail@gmail.com"
        className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--muted)] hover:text-[color:var(--text-color)] mb-8"
      >
        <Mail className="w-3.5 h-3.5" />
        fuad.jemal.mail@gmail.com
      </a>

      <form className="space-y-3 max-w-xl" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
            aria-label="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
            autoComplete="email"
            aria-label="Email"
          />
        </div>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y min-h-[110px]`}
          placeholder="Tell me about the project…"
          aria-label="Message"
        />

        {status && (
          <p
            role={status.type === 'success' ? 'status' : 'alert'}
            className="text-sm"
            style={{ color: status.type === 'success' ? '#3d8b5c' : '#b45454' }}
          >
            {status.message}
          </p>
        )}

        <button type="submit" disabled={sending} className="btn-solid !rounded-none disabled:opacity-60">
          {sending ? 'Sending…' : 'Send message'}
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-[color:var(--card-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="icon-btn !rounded-none"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="icon-btn !rounded-none"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIAL.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="icon-btn !rounded-none"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-[12px] text-[color:var(--muted)]">
          © {new Date().getFullYear()} Fuad Jemal
        </p>
      </div>
    </footer>
  );
}
