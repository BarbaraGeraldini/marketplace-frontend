import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(90deg, rgb(30, 21, 27) 0%, #a8caba 100%)" }}>
    <div className="container">
      <Link
        className="navbar-brand fw-bold"
        to="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          letterSpacing: "2px",
          color: "rgb(168, 202, 186)" // AQUÍ el color con comillas
        }}
      >
        🎨 Galería Creativa
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/publicar">Publicar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registro">Registro</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;

