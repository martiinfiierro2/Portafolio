import { Download, FileText } from 'lucide-react';
import { profile } from '../../data/profile';

export default function CvPanel() {
  return (
    <>
      <p className="panel-introduction">
        Experiencia, formación y las herramientas con las que construyo.
      </p>
      {profile.cvUrl ? (
        <>
          <iframe
            className="cv-preview"
            src={profile.cvUrl}
            title="Vista previa del CV de Martín Fierro"
          />
          <a
            className="button primary"
            href={profile.cvUrl}
            download
            target="_blank"
            rel="noreferrer"
          >
            <Download size={17} aria-hidden="true" />
            Descargar CV
          </a>
          <p className="cv-fallback">
            Si tu navegador no muestra la vista previa, abre o descarga el documento.
          </p>
        </>
      ) : (
        <>
          <div className="cv-empty">
            <div className="cv-paper-preview" aria-hidden="true">
              <FileText size={25} strokeWidth={1.2} />
              <span />
              <span />
              <span />
              <span />
            </div>
            <h3>El próximo capítulo, aquí.</h3>
            <p>El CV estará disponible en este espacio.</p>
          </div>
          <button className="button primary" disabled>
            <Download size={17} aria-hidden="true" />
            Descargar CV · próximamente
          </button>
        </>
      )}
    </>
  );
}
