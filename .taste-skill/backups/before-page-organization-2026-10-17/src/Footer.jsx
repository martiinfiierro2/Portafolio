import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-bottom">
          <Link className="wordmark" to="/#inicio">
            <span>
              mf<span className="accent">.</span>
            </span>
          </Link>
          <span>© {new Date().getFullYear()} Martín Fierro</span>
          <Link to="/#inicio">
            Volver al inicio <ArrowUp size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
