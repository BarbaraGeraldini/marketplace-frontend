import { Link } from "react-router-dom";

const Navbar = () => {
  // Detecta si hay usuario guardado (puedes cambiar esto por context si tienes uno)
  const isLogged = !!localStorage.getItem("token"); // O puedes usar "user" si guardas el usuario

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(90deg, rgb(30, 21, 27) 0%, #a8caba 100%)" }}>
      <div className="container">
        <Link
          className="navbar-brand fw-bold custom-color"
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            letterSpacing: "2px",
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
            {isLogged && (  // <-- Solo muestra si está logueado
              <li className="nav-item">
                <Link className="nav-link" to="/publicar">Publicar</Link>
              </li>
            )}
            {!isLogged && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registro</Link>
                </li>
              </>
            )}
            {isLogged && (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

