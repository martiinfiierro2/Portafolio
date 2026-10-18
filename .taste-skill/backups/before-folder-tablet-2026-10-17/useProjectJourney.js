import { useLayoutEffect, useRef } from "react";

const clamp = (value) => Math.max(0, Math.min(1, value));
const phase = (value, start, end) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export default function useProjectJourney() {
  const journeyRef = useRef(null);

  useLayoutEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const track = journey.querySelector(".journey-track");
    const stage = journey.querySelector(".journey-stage");
    const hero = journey.querySelector(".hero");
    const intro = journey.querySelector(".hero-intro");
    const links = journey.querySelector(".hero-links");
    const object = journey.querySelector(".hero-object");
    const scene = journey.querySelector(".tablet-scene");
    const tablet = journey.querySelector(".project-tablet");
    const screen = journey.querySelector(".tablet-screen");
    const caption = journey.querySelector("figcaption");
    const explore = journey.querySelector(".tablet-explore");
    const keys = [...journey.querySelectorAll(".tablet-key")];
    const letters = [...journey.querySelectorAll("[data-hero-letter]")];
    const catalog = journey.querySelector(".journey-catalog");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let geometry;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let animationFrame = 0;
    let disposed = false;
    let catalogIsOpen = false;

    function stopAnimation() {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function setAccessible(element, accessible) {
      element.inert = !accessible;
      if (accessible) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", "true");
    }

    function resetVisuals() {
      for (const element of [scene, tablet, screen, caption, explore, intro, links, catalog, ...keys, ...letters]) {
        element.style.removeProperty("transform");
        element.style.removeProperty("opacity");
      }
      catalog.style.removeProperty("clip-path");
      catalog.style.removeProperty("pointer-events");
      catalog.style.removeProperty("visibility");
      scene.style.removeProperty("transform-origin");
      setAccessible(hero, true);
      setAccessible(intro, true);
      setAccessible(links, true);
      setAccessible(object, true);
      setAccessible(catalog, true);
    }

    function render() {
      scrollFrame = 0;
      if (!geometry || disposed || reducedMotion.matches) return;
      const { start, distance, width, height, dx, dy, scale, catalogOverflow, narrow } = geometry;
      const progress = clamp((window.scrollY - start) / distance);
      const centered = phase(progress, 0.24, 0.56);
      const enlarged = phase(progress, 0.59, 0.91);
      const opened = phase(progress, 0.63, 0.88);
      const revealed = phase(progress, 0.73, 0.83);
      journey.dataset.progress = progress.toFixed(4);

      letters.forEach((letter, index) => {
        const stagger = (index % 6) * 0.014;
        const separated = phase(progress, 0.055 + stagger, 0.37 + stagger);
        const direction = letter.dataset.direction === "left" ? -1 : 1;
        letter.style.transform = `translate3d(${direction * separated * width * 1.1}px, ${separated * ((index % 3) - 1) * 24}px, 0) rotate(${direction * separated * 9}deg)`;
        letter.style.opacity = String(1 - phase(progress, 0.23 + stagger, 0.39 + stagger));
      });
      for (const element of [intro, links]) {
        const leaving = phase(progress, 0.015, 0.2);
        element.style.transform = `translate3d(${-leaving * 65}px, 0, 0)`;
        element.style.opacity = String(1 - leaving);
        setAccessible(element, progress < 0.2);
      }

      scene.style.transform = `translate3d(${dx * centered}px, ${dy * centered}px, 0) scale(${1 + (scale - 1) * enlarged})`;
      tablet.style.transform = `perspective(1400px) rotateX(${narrow ? 0 : 8 * (1 - centered)}deg) rotateY(${narrow ? 0 : -12 * (1 - centered)}deg) rotateZ(${(narrow ? -2 : 3) * (1 - centered)}deg)`;
      scene.style.opacity = String(1 - phase(progress, 0.94, 1));
      caption.style.opacity = String(1 - phase(progress, 0.17, 0.39));
      screen.style.opacity = String(phase(progress, 0.6, 0.82));
      keys.forEach((key, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        key.style.transform = `translate3d(${direction * opened * 130}px, 0, 0) rotateY(${direction * opened * 68}deg)`;
        key.style.opacity = String(1 - phase(progress, 0.65, 0.83));
      });
      explore.style.transform = `translate3d(0, ${opened * 90}px, 0)`;
      explore.style.opacity = String(1 - phase(progress, 0.64, 0.8));
      setAccessible(object, progress < 0.12);
      setAccessible(hero, progress < 0.94);

      // Counter the remaining scroll so the real catalog opens inside the tablet.
      // At the end this transform is zero: normal document scrolling takes over.
      catalog.style.transform = `translate3d(0, ${-(1 - progress) * distance}px, 0)`;
      catalog.style.opacity = String(revealed);
      catalog.style.visibility = revealed === 0 ? "hidden" : "visible";
      const inset = 1 - phase(progress, 0.77, 0.99);
      const bottom = catalogOverflow * (1 - phase(progress, 0.97, 1));
      catalog.style.clipPath = progress >= 1
        ? "none"
        : `inset(${height * 0.2 * inset}px ${width * 0.23 * inset}px ${bottom + height * 0.2 * inset}px ${width * 0.23 * inset}px round ${22 * inset}px)`;
      catalog.style.pointerEvents = progress >= 0.96 ? "auto" : "none";
      setAccessible(catalog, progress >= 0.96);
      if (catalogIsOpen !== (progress >= 0.96)) {
        catalogIsOpen = progress >= 0.96;
        window.dispatchEvent(new CustomEvent("portfolio:section", {
          detail: { id: catalogIsOpen ? "proyectos" : "inicio" },
        }));
      }
    }

    function measure() {
      resizeFrame = 0;
      if (disposed) return;
      resetVisuals();
      const canAnimate = !reducedMotion.matches && window.innerHeight >= 560;
      journey.dataset.animated = String(canAnimate);
      if (!canAnimate) {
        journey.dataset.progress = "0";
        geometry = null;
        return;
      }
      // Measure the tablet without perspective, then restore its initial angle.
      tablet.style.transform = "none";
      const stageBox = stage.getBoundingClientRect();
      const sceneBox = scene.getBoundingClientRect();
      const tabletBox = tablet.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage).top);
      const centerX = tabletBox.left + tabletBox.width / 2;
      const centerY = tabletBox.top + tabletBox.height / 2;
      scene.style.transformOrigin = `${centerX - sceneBox.left}px ${centerY - sceneBox.top}px`;
      geometry = {
        start: track.getBoundingClientRect().top + window.scrollY - top,
        distance: track.offsetHeight - stage.offsetHeight,
        width: stageBox.width,
        height: stageBox.height,
        dx: stageBox.width / 2 - (centerX - stageBox.left),
        dy: stageBox.height / 2 - (centerY - stageBox.top),
        scale: Math.max(stageBox.width / tabletBox.width, stageBox.height / tabletBox.height) * 1.08,
        catalogOverflow: Math.max(0, catalog.offsetHeight - stageBox.height),
        narrow: window.innerWidth <= 900,
      };
      render();
    }

    function scheduleScroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(render);
    }

    function scheduleMeasure() {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(measure);
    }

    function handleViewportChange() {
      stopAnimation();
      scheduleMeasure();
    }

    function focusCatalog() {
      catalog.querySelector("#projects-title")?.focus({ preventScroll: true });
    }

    function openProjects(event) {
      stopAnimation();
      if (reducedMotion.matches || !geometry) {
        catalog.scrollIntoView({ behavior: "instant", block: "start" });
        focusCatalog();
        return;
      }
      const target = geometry.start + geometry.distance;
      if (!event.detail?.animate || Math.abs(window.scrollY - target) < 2) {
        window.scrollTo({ top: target, behavior: "instant" });
        render();
        focusCatalog();
        return;
      }
      const from = window.scrollY;
      const started = performance.now();
      const duration = Math.min(1700, Math.max(750, Math.abs(target - from) * 1.3));
      function advance(now) {
        const t = clamp((now - started) / duration);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo({ top: from + (target - from) * eased, behavior: "instant" });
        render();
        if (t < 1) animationFrame = requestAnimationFrame(advance);
        else {
          animationFrame = 0;
          focusCatalog();
        }
      }
      animationFrame = requestAnimationFrame(advance);
    }

    function cancelFromKeyboard(event) {
      if (["Escape", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) stopAnimation();
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(stage);
    resizeObserver.observe(scene);
    resizeObserver.observe(catalog);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("portfolio:explore", openProjects);
    window.addEventListener("wheel", stopAnimation, { passive: true });
    window.addEventListener("touchstart", stopAnimation, { passive: true });
    window.addEventListener("pointerdown", stopAnimation, { passive: true });
    window.addEventListener("keydown", cancelFromKeyboard);
    reducedMotion.addEventListener("change", handleViewportChange);
    document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });
    measure();

    return () => {
      disposed = true;
      stopAnimation();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("portfolio:explore", openProjects);
      window.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("touchstart", stopAnimation);
      window.removeEventListener("pointerdown", stopAnimation);
      window.removeEventListener("keydown", cancelFromKeyboard);
      reducedMotion.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return journeyRef;
}
