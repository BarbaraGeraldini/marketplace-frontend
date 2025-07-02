import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { email, password }
      );
      login({
        ...res.data.usuario,
        token: res.data.token,
      });
      navigate("/perfil");
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al iniciar sesión. Intenta de nuevo."
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-lg border-0" style={{ borderRadius: "22px", background: "#fff7f0" }}>
          <h2 className="text-center mb-4" style={{ color: "#5d4157" }}>Accede a tu cuenta</h2>
          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <button type="submit" className="btn btn-dark w-100 mt-2">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
