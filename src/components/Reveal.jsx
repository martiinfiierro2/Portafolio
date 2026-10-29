import { motion as Motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0, side = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <Motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0.35, transform: side ? `translateX(${side}px)` : "translateY(18px)" }}
      whileInView={{ opacity: 1, transform: "translate(0, 0)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >{children}</Motion.div>
  );
}
