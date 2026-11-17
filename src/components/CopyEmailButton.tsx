import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

type Props = {
  variant?: 'link' | 'button';
  label?: string;
};

export default function CopyEmailButton({ variant = 'link', label = 'Copy Email' }: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <span className="copy-email-inline">
      <button
        className={variant === 'button' ? 'btn-solid-dark' : 'hero-text-link copy-link-btn'}
        type="button"
        onClick={copyEmail}
        aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${profile.email}`}
      >
        {copied ? 'Email Copied' : label}
      </button>
      <span className={copied ? 'copy-confirm is-visible' : 'copy-confirm'} role="status" aria-live="polite">
        {copied ? profile.email : ''}
      </span>
    </span>
  );
}
