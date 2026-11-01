import { Link, useNavigate } from "react-router-dom";

// Keep section links usable as real URLs, including opening in another tab.
export default function SectionLink({ section, onClick, children, ...props }) {
  const navigate = useNavigate();
  const to = `/#${section}`;

  function follow(event) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const instant = event.detail === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches;
    navigate(to, { state: { scrollBehavior: instant ? "instant" : "smooth" } });
  }

  return <Link {...props} to={to} onClick={follow}>{children}</Link>;
}
