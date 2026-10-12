import { Download, ArrowUpRight, FileText } from 'lucide-react';
import { profile } from '../../data/profile';
export default function CvPanel() {
  return (
    <div className="cv-layout">
      {profile.cvUrl ? (
        <iframe
          className="cv-preview"
          src={profile.cvUrl}
          title="Vista previa del CV de Martín Fierro"
        />
      ) : (
        <div className="cv-placeholder" aria-label="Vista previa del CV pendiente">
          <FileText size={35} strokeWidth={1.1} aria-hidden="true" />
          <strong>{profile.name}</strong>
          <span>Desarrollador full-stack junior</span>
          <div className="cv-placeholder-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>Documento pendiente</p>
        </div>
      )}
      <div className="cv-content">
        <p className="eyebrow">Mi recorrido</p>
        <h2 id="panel-title">
          Mi CV<span>.</span>
        </h2>
        <p className="panel-introduction">
          Experiencia, formación y las herramientas con las que construyo.
        </p>
        {profile.cvUrl ? (
          <>
            <a
              className="button primary"
              href={profile.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
            >
              Descargar PDF <Download size={17} aria-hidden="true" />
            </a>
            <a className="button secondary" href={profile.cvUrl} target="_blank" rel="noreferrer">
              Ver versión online <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </>
        ) : (
          <>
            <button className="button primary" disabled>
              Descargar PDF <Download size={17} aria-hidden="true" />
            </button>
            <p className="cv-fallback">
              El CV estará disponible aquí cuando se añada el documento.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
