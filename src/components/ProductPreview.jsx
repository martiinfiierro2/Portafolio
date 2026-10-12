import { ArrowUpRight, Layers, Play, Square } from "lucide-react";

export default function ProductPreview() {
  return (
    <a
      className="product-preview"
      href="#proyectos"
      aria-label="Explorar mis proyectos"
    >
      <div className="product-device" aria-hidden="true">
        <div className="product-toolbar">
          <span className="product-dots">
            <i />
            <i />
            <i />
          </span>
          <span>Martín Fierro</span>
          <ArrowUpRight size={13} />
        </div>
        <div className="product-screen">
          <div className="product-screen-copy">
            <span>CREAR. CONECTAR. MEJORAR.</span>
            <strong>
              Una idea.
              <br />
              Muchas posibilidades.
            </strong>
            <span className="product-mini-link">
              Explorar <ArrowUpRight size={12} />
            </span>
          </div>
          <div className="product-tiles">
            <div className="product-tile product-tile-web">
              <Square size={26} strokeWidth={1} />
              <span>Web</span>
              <div className="product-bars">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="product-tile product-tile-media">
              <Layers size={24} strokeWidth={1} />
              <span>Multimedia</span>
              <span className="product-play">
                <Play size={16} fill="currentColor" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className="product-foot" aria-hidden="true" />
    </a>
  );
}
