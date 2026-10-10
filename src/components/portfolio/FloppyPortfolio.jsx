import { useState } from 'react';
import { profile } from '../../data/profile';
import { disks } from '../../data/disks';
import useFloppyPlayer from '../../hooks/useFloppyPlayer';
import Header from './Header';
import Footer from './Footer';
import PortfolioContent from './PortfolioContent';
import ContactDialog from './ContactDialog';
import './floppy.css';

export default function FloppyPortfolio() {
  const player = useFloppyPlayer();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="floppy-portfolio">
      <a className="floppy-skip" href="#floppy-content">
        Saltar al contenido
      </a>
      <div className="floppy-player">
        <Header
          name={profile.name}
          githubUrl={profile.githubUrl}
          view={player.view}
          busy={player.busy}
          onProfile={player.openProfile}
          onProjects={player.openProjects}
          onContact={() => setContactOpen(true)}
        />
        <PortfolioContent
          view={player.view}
          project={player.contentDisk}
          profile={profile}
          projects={disks}
          busy={player.busy}
          onProjects={player.openProjects}
          onSelect={player.selectProject}
        />
        <Footer
          name={profile.name}
          disk={player.disk}
          phase={player.phase}
          busy={player.busy}
          onEject={player.eject}
          onAnimationComplete={player.completeAnimation}
        />
      </div>
      <ContactDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        githubUrl={profile.githubUrl}
      />
    </div>
  );
}
