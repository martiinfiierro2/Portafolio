import { useId, useState } from 'react';
import type { ProjectMedia } from '../../types/portfolio';

export default function ProjectGallery({ media }: { media: ProjectMedia[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const current = media[selected] ?? media[0];
  if (!current || media.length < 2) return null;
  return (
    <section className="project-gallery" aria-label="Más capturas">
      <div role="tablist" aria-label="Capturas del proyecto">
        {media.map((item, index) => (
          <button
            key={item.id}
            id={`${id}-${item.id}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % media.length
                  : event.key === 'ArrowLeft'
                    ? (index - 1 + media.length) % media.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? media.length - 1
                        : null;
              if (next === null) return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`${id}-${media[next].id}`)?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <figure
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${current.id}`}
        tabIndex={0}
      >
        <img
          src={current.src}
          alt={current.alt}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
