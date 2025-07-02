import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/usuarios`,
        { nombre, email, password }
      );
      login({
        ...res.data.usuario,
        token: res.data.token,
      });
      alert(`¡Registro exitoso! Bienvenido/a, ${nombre}`);
      setNombre("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-lg border-0" style={{ borderRadius: "22px", background: "#fff7f0" }}>
          <h2 className="text-center mb-4" style={{ color: "#5d4157" }}>Crea tu cuenta</h2>
          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <button type="submit" className="btn btn-dark w-100 mt-2">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;


