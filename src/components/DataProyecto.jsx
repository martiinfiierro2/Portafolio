export default function DataProyecto() {
  return (
    <div className='tecnologias-container'>
      <ul className="lista-data">
        <li>
          <p><strong>WEB:</strong></p>
          <p className="lista-content">No tiene web</p>
        </li>
        <li>
          <p className="lista-titulos"><strong>TECNOLOGÍAS:</strong></p>
          <div className="tecnologias">
              <label>Angular</label>
              <label>NodeJS</label>
              <label>MySQL</label>
          </div>
        </li>
        <li>
          <p><strong>REPOSITORIO:</strong></p>
          <p className="lista-content">Link</p>
        </li>
      </ul>
    </div>
  );
}