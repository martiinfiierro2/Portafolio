import { ArrowUpRight } from "lucide-react";
import { contact } from "../data/contact";

export default function SocialMedia() {
  return (
    <div className="contact-channels" aria-label="Canales de contacto">
      <a className="contact-channel" href={contact.github} target="_blank" rel="noopener noreferrer">
        <span><strong>GitHub</strong><small>@{new URL(contact.github).pathname.slice(1)}</small></span>
        <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span>
      </a>
    </div>
  );
}
