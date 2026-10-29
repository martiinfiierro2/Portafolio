import { ArrowUpRight, MessageCircle } from "lucide-react";
import { contact } from "../data/contact";
import "./SocialMedia.css";

const networks = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp" },
];

function SocialIcon({ network }) {
  if (network === "whatsapp") return <MessageCircle size={23} aria-hidden="true" />;
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {network === "github" && <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.15 1.72 1.15 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.54 0-1.23.44-2.23 1.15-3.02-.12-.29-.5-1.43.11-2.97 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.97.72.79 1.15 1.79 1.15 3.02 0 4.3-2.64 5.26-5.15 5.54.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />}
      {network === "linkedin" && <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3V9Zm6 0h4v1.6c.7-1.1 1.8-1.9 3.5-1.9 3.2 0 4.5 2 4.5 5.3v7h-4v-6.3c0-1.7-.4-2.7-1.9-2.7-1.6 0-2.1 1.1-2.1 2.7V21H9V9Z" />}
      {network === "instagram" && <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g>}
    </svg>
  );
}

export default function SocialMedia() {
  return (
    <div className="social-media" aria-label="Redes sociales">
      {networks.map(({ key, label }) => {
        const href = contact[key];
        if (!href) return null;
        return (
          <a className="social-link" key={key} href={href} target="_blank" rel="noopener noreferrer">
            <SocialIcon network={key} /><span>{label}{key === "github" && <small>{new URL(href).pathname.replaceAll("/", "")}</small>}</span><ArrowUpRight className="social-arrow" size={22} aria-hidden="true" />
            <span className="sr-only"> (abre una nueva pestaña)</span>
          </a>
        );
      })}
    </div>
  );
}
