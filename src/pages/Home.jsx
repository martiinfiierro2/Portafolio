import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useProjectSelection from '../hooks/useProjectSelection';
import ProjectDeck from '../components/project-deck/ProjectDeck';
import ProjectDialog from '../components/project-deck/ProjectDialog';
import Contact from './Contact';
import CV from './CV';
import { transition } from '../utils/viewTransition';

export default function Home() {
  useDocumentTitle('Inicio');
  const heroRef = useRef(null);
  const { projects, selectedSlug, selectProject } = useProjectSelection();
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(
    () =>
      projects.find(
        (project) => project.slug === new URLSearchParams(location.search).get('project'),
      ) ?? null,
  );
  useEffect(() => {
    if (opened && selectedSlug !== opened.slug) selectProject(opened.slug);
  }, [opened, selectedSlug, selectProject]);
  const [origin, setOrigin] = useState(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.65]);
  const filter = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(12px)']);
  function openProject(project) {
    const card = document.querySelector('.project-card.active');
    const bounds = card?.getBoundingClientRect();
    const rectangle = bounds
      ? { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }
      : null;
    transition(() => {
      selectProject(project.slug);
      setOrigin(rectangle);
      setOpened(project);
    });
  }
  return (
    <div className="progressive-portfolio">
      <section
        id="inicio"
        ref={heroRef}
        className="home-page page-container"
        aria-labelledby="home-title"
      >
        <m.div className="home-intro">
          <m.div
            className="intro-ornament"
            aria-hidden="true"
            style={reduced ? undefined : { opacity }}
          >
            <span />
            <span />
            <span />
          </m.div>
          <p className="eyebrow intro-greeting">¡Hola! Soy</p>
          <m.h1 id="home-title" tabIndex={-1} style={reduced ? undefined : { opacity, filter }}>
            {profile.name.split(' ')[0]}{' '}
            <span className="name-highlight">{profile.name.split(' ').slice(1).join(' ')}</span>
          </m.h1>
          <p className="profile-role">{profile.role}</p>
          <p className="home-tagline">{profile.tagline}</p>
          <a className="collection-entry" href="#proyectos">
            <span className="collection-entry-line" aria-hidden="true" />
            <span>Explorar colección</span>
            <ArrowDown size={19} aria-hidden="true" />
          </a>
        </m.div>
      </section>
      <m.section
        id="proyectos"
        className="collection-section page-container"
        aria-label="Proyectos"
        initial={reduced ? false : { opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduced ? 0 : 0.6 }}
      >
        <h2 className="sr-only">Proyectos</h2>
        <ProjectDeck
          projects={projects}
          selectedSlug={selectedSlug}
          onSelect={selectProject}
          onOpen={openProject}
          detailOpen={Boolean(opened)}
        />
      </m.section>
      <section id="cv" className="inline-cv narrow-container" aria-label="Currículum">
        <details>
          <summary>Currículum</summary>
          <CV embedded />
        </details>
      </section>
      <section id="contacto" className="contact-section" aria-label="Contacto">
        <Contact embedded />
      </section>
      {opened && (
        <ProjectDialog
          project={opened}
          origin={origin}
          onClose={() => {
            setOpened(null);
            if (location.search)
              navigate({ pathname: '/', hash: location.hash }, { replace: true });
          }}
        />
      )}
    </div>
  );
}
