import { useState } from 'react';
import { profile } from '../data/profile';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      className="button button-secondary"
      type="button"
      onClick={copyEmail}
      aria-live="polite"
    >
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        {copied ? (
          <path d="m5 12 4 4L19 6" />
        ) : (
          <>
            <rect width="13" height="13" x="9" y="9" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      {copied ? 'Email copied' : 'Copy email'}
    </button>
  );
}
