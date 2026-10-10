import { ArrowUpRight } from 'lucide-react';
export default function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="availability">
          <span aria-hidden="true" />
          {profile.availability}
        </p>
        <div className="footer-links">
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              Email <ArrowUpRight size={13} />
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} />
            </a>
          )}
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
        </div>
        <p className="footer-credit">
          Diseñado y desarrollado por {profile.name} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
