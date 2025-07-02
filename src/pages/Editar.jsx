import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PublicacionesContext } from "../context/PublicacionesContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Editar = () => {
  const { id } = useParams();
  const { publicaciones, setPublicaciones } = useContext(PublicacionesContext);
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
    categoria_id: "",
  });
  const [estado, setEstado] = useState("");

  // Cargar la publicación desde el estado global o el backend
  useEffect(() => {
    const pub = publicaciones.find((p) => String(p.id) === String(id));
    if (pub) {
      setPublicacion(pub);
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/publicaciones/${id}`)
        .then((res) => setPublicacion(res.data))
        .catch((error) => {
          console.error("Error al cargar la publicación:", error);
          setEstado("Error al cargar la publicación.");
        });
    }
  }, [id, publicaciones]);

  const manejarEdicion = async (e) => {
    e.preventDefault();
    setEstado("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/publicaciones/${id}`,
        publicacion,
        {
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      setPublicaciones((prev) =>
        prev.map((pub) => (pub.id === res.data.id ? res.data : pub))
      );
      setEstado("Publicación actualizada correctamente.");
      navigate(`/detalle/${id}`); // Redirige al detalle de la publicación
    } catch (error) {
      console.error("Error al editar la publicación:", error);
      setEstado("Error al editar la publicación.");
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPublicacion((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Editar Publicación</h2>
      {estado && <div className="alert alert-info">{estado}</div>}
      <form onSubmit={manejarEdicion}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={publicacion.titulo}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="3"
            value={publicacion.descripcion}
            onChange={manejarCambio}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={publicacion.precio}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen_url" className="form-label">
            URL de la Imagen
          </label>
          <input
            type="url"
            className="form-control"
            id="imagen_url"
            name="imagen_url"
            value={publicacion.imagen_url}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria_id" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            id="categoria_id"
            name="categoria_id"
            value={publicacion.categoria_id}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="1">Artes visuales</option>
            <option value="2">Artes plásticas</option>
            <option value="3">Servicios</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(`/detalle/${id}`)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Editar;