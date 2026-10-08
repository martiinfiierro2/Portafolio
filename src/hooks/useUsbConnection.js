import { useEffect, useRef, useState } from 'react';
import { useAnimate, useReducedMotion } from 'framer-motion';

// Las coordenadas se miden en el contenedor, no dependen de un tamaño de pantalla fijo.
export default function useUsbConnection(containerRef, displayRef) {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState('idle');
  const [drive, setDrive] = useState(null);
  const [project, setProject] = useState(null);
  const [geometry, setGeometry] = useState(null);
  const busy = useRef(false);
  const current = useRef(null);
  const origins = useRef(new Map());
  const mounted = useRef(true);
  const phaseRef = useRef('idle');

  function setStage(value) { phaseRef.current = value; setPhase(value); }
  function rect(element) {
    const box = element.getBoundingClientRect();
    const root = containerRef.current.getBoundingClientRect();
    return { x: box.left - root.left, y: box.top - root.top, width: box.width, height: box.height };
  }
  function target() {
    const mobile = window.matchMedia('(max-width: 800px)').matches;
    const port = rect(displayRef.current.querySelector('.usb-port'));
    return mobile
      ? { x: port.x + port.width / 2 - 35, y: port.y + port.height / 2 - 10, width: 70, height: 165.45 }
      : { x: port.x + port.width / 2 - 10, y: port.y + port.height / 2 - 38.08, width: 180, height: 76.15 };
  }
  function origin(id) {
    const button = origins.current.get(id);
    const svg = button?.querySelector(window.matchMedia('(max-width: 800px)').matches ? '.usb-drive-vertical' : '.usb-drive-horizontal');
    return svg ? rect(svg) : target();
  }
  async function move(destination, duration) {
    if (!scope.current) return;
    await animate(scope.current, destination, { duration: reducedMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1] });
  }
  async function detach() {
    setStage('disconnecting');
    const connected = target();
    const mobile = window.matchMedia('(max-width: 800px)').matches;
    await move({ ...connected, x: connected.x + (mobile ? 0 : 24), y: connected.y + (mobile ? 24 : 0) }, .16);
    const button = origins.current.get(current.current.id);
    button?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    await move(origin(current.current.id), .36);
    if (!mounted.current) return;
    setProject(null); setDrive(null); setGeometry(null); current.current = null;
  }
  async function connect(next, element) {
    if (busy.current || current.current?.id === next.id) return;
    busy.current = true;
    origins.current.set(next.id, element);
    try {
      if (current.current) await detach();
      if (!mounted.current) return;
      const start = origin(next.id);
      current.current = next;
      setDrive(next); setGeometry(start); setStage('connecting');
      // Esperar al render de la memoria viajera antes de iniciar el movimiento.
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (!mounted.current) return;
      const end = target();
      const mobile = window.matchMedia('(max-width: 800px)').matches;
      await move({ ...end, x: end.x + (mobile ? 0 : 24), y: end.y + (mobile ? 24 : 0) }, .4);
      await move(end, .18);
      if (!mounted.current) return;
      setProject(next); setStage('connected');
      requestAnimationFrame(() => {
        if (!mounted.current) return;
        // El contenido puede cambiar la altura de la pantalla; volver a medir el puerto.
        move(target(), 0);
        displayRef.current.querySelector('#project-title')?.focus({ preventScroll: true });
        if (window.matchMedia('(max-width: 800px)').matches) {
          displayRef.current.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' });
        }
      });
    } finally { busy.current = false; }
  }
  async function disconnect() {
    if (busy.current || !current.current) return;
    busy.current = true;
    const button = origins.current.get(current.current.id);
    try {
      await detach();
      if (mounted.current) {
        setStage('idle');
        requestAnimationFrame(() => button?.focus({ preventScroll: true }));
      }
    }
    finally { busy.current = false; }
  }
  useEffect(() => {
    mounted.current = true;
    const root = containerRef.current;
    const display = displayRef.current;
    let frame;
    function reposition() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (phaseRef.current !== 'connected' || !scope.current) return;
        const mobile = window.matchMedia('(max-width: 800px)').matches;
        const port = display.querySelector('.usb-port').getBoundingClientRect();
        const box = root.getBoundingClientRect();
        const destination = mobile
          ? { x: port.left - box.left + port.width / 2 - 35, y: port.top - box.top + port.height / 2 - 10, width: 70, height: 165.45 }
          : { x: port.left - box.left + port.width / 2 - 10, y: port.top - box.top + port.height / 2 - 38.08, width: 180, height: 76.15 };
        animate(scope.current, destination, { duration: 0 });
      });
    }
    const observer = new ResizeObserver(reposition);
    observer.observe(display);
    observer.observe(root);
    window.addEventListener('resize', reposition);
    return () => { mounted.current = false; observer.disconnect(); window.removeEventListener('resize', reposition); cancelAnimationFrame(frame); };
  }, [animate, containerRef, displayRef, scope]);
  return { phase, drive, project, geometry, scope, connect, disconnect };
}
