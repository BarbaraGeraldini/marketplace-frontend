import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PublicacionesContext } from "../context/PublicacionesContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Detalle = () => {
  const { id } = useParams();
  const { publicaciones, setPublicaciones } = useContext(PublicacionesContext);
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  const [publicacion, setPublicacion] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPublicacion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/publicaciones/${id}`
        );
        setPublicacion(response.data);
        setPublicaciones((prev = []) => {
          const existe = prev.some((p) => p && p.id === response.data.id);
          return existe
            ? prev.map((p) => (p && p.id === response.data.id ? response.data : p))
            : [response.data, ...prev];
        });
      } catch (error) {
        console.error("Error al obtener la publicación:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPublicacion();
  }, [id, setPublicaciones]);

  useEffect(() => {
    const obtenerMensajes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mensajes/publicacion/${id}`
        );
        setMensajes(res.data);
      } catch (error) {
        setMensajes([]);
      }
    };
    obtenerMensajes();
  }, [id, estado]);

  const manejarEnvioMensaje = async (e) => {
    e.preventDefault();
    setEstado("");
    if (!usuario) {
      setEstado(
        <div className="alert alert-danger mt-3">
          Debes iniciar sesión para enviar mensajes.
        </div>
      );
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/mensajes`,
        {
          contenido: mensaje,
          publicacion_id: publicacion.id,
        },
        {
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      setMensaje("");
      setEstado("Mensaje enviado correctamente a " + publicacion.autor);

      const [resMensajes, resPub] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/mensajes/publicacion/${publicacion.id}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/publicaciones/${publicacion.id}`)
      ]);
      setMensajes(resMensajes.data);

      setPublicaciones((prev = []) =>
        prev.map((pub) => (pub && pub.id === resPub.data.id ? resPub.data : pub))
      );
    } catch (error) {
      setEstado("Error al enviar el mensaje");
    }
  };

  const handleEliminar = async (obra) => {
    if (
      window.confirm(
        `¿Seguro que deseas eliminar esta publicación? Se eliminarán también todos los mensajes relacionados.`
      )
    ) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/publicaciones/${obra.id}`, {
          headers: { Authorization: `Bearer ${usuario.token}` },
        });
        setPublicaciones((prev = []) => prev.filter((pub) => pub && pub.id !== obra.id));
        navigate("/");
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        alert("Ocurrió un error al intentar eliminar la publicación.");
      }
    }
  };

  if (cargando) {
    return (
      <div className="text-center my-5">
        <h2 style={{ color: "#5d4157" }}>Cargando publicación...</h2>
      </div>
    );
  }

  if (!publicacion) {
    return (
      <div className="text-center my-5">
        <h2>La publicación no existe o ha sido eliminada.</h2>
        <Link to="/" className="btn btn-dark mt-3">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <img
            src={publicacion.imagen_url}
            alt={publicacion.titulo}
            className="img-fluid rounded shadow-lg"
            style={{
              borderRadius: "30px",
              boxShadow: "0 8px 32px 0 rgba(60,40,10,0.10)"
            }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4" style={{ color: "#5d4157" }}>{publicacion.titulo}</h2>
          <p className="fs-5"><strong>Descripción:</strong> {publicacion.descripcion}</p>
          <p><strong>Categoría:</strong> {publicacion.categoria && publicacion.categoria.charAt(0).toUpperCase() + publicacion.categoria.slice(1)}</p>
          <p><strong>Autor:</strong> {publicacion.autor}</p>
          {publicacion.precio !== undefined && (
            <p>
              <strong>Precio:</strong> ${publicacion.precio.toLocaleString()}
            </p>
          )}
          <p>
            <strong>Cantidad de mensajes:</strong> {publicacion.cantidad_mensajes}
          </p>

          {/* Sección de mensajes */}
          <div id="mensajes" className="mt-4">
            <h5>Mensajes recibidos</h5>
            {mensajes.length === 0 ? (
              <p className="text-muted">No hay mensajes para este producto.</p>
            ) : (
              <ul className="list-group mb-3">
                {mensajes.map((m) => (
                  <li key={m.id} className="list-group-item">
                    <strong>{m.autor_mensaje}:</strong> {m.contenido}
                    <span className="text-muted float-end" style={{ fontSize: "0.9em" }}>
                      {new Date(m.fecha_envio).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Formulario de mensajes */}
          <form id="form-mensajes" onSubmit={manejarEnvioMensaje} className="mt-4">
            <h5>Enviar mensaje al autor</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Escribe tu mensaje aquí..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-outline-dark">
              Enviar
            </button>
            {estado && <div className="mt-2">{estado}</div>}
          </form>

          {/* Botones de editar/eliminar si eres el autor */}
          {usuario && usuario.id === publicacion.usuario_id && (
            <div className="mt-4">
              <Link to={`/editar/${publicacion.id}`} className="btn btn-warning btn-sm me-2">
                Editar
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleEliminar(publicacion)}
              >
                Eliminar
              </button>
            </div>
          )}

          <div className="mt-4">
            <button className="btn btn-dark" onClick={() => navigate("/")}>
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
