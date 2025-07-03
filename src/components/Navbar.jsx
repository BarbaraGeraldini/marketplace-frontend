import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Recupera usuario y token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // o donde quieras redirigir
    window.location.reload(); // fuerza refresco si algo queda colgado en memoria
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "linear-gradient(90deg, rgb(30, 21, 27) 0%, #a8caba 100%)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold custom-color" to="/">🎨 Galería Creativa</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            {user && (
              <>
                <span className="nav-link">👋 Hola, {user.nombre}</span>
                <li className="nav-item"><Link className="nav-link" to="/perfil">Mi perfil</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/publicar">Publicar</Link></li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark" style={{ borderRadius: "10px" }} onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

