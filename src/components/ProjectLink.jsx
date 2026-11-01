import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

let activeTransition;

export default function ProjectLink({ to, children, onClick, ...props }) {
  const navigate = useNavigate();
  function open(event) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.detail === 0 || !document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    activeTransition?.skipTransition();
    activeTransition = document.startViewTransition(() => {
      flushSync(() => navigate(to));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    activeTransition.finished.catch(() => {});
  }
  return <Link to={to} onClick={open} {...props}>{children}</Link>;
}
