import { useEffect, useState } from "react";

const sectionIds = ["inicio", "proyectos", "sobre-mi", "contacto"];

export default function useActiveSection(enabled) {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;

    let observer;

    function observeSections() {
      observer?.disconnect();
      const height = window.innerHeight;
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActiveSection(visible.target.id);
        },
        {
          rootMargin: `${-height * 0.2}px 0px ${-height * 0.65}px 0px`,
          threshold: 0,
        },
      );
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    }

    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [enabled]);

  return activeSection;
}
