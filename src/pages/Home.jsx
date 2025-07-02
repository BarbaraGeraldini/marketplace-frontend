import { useState, useContext } from "react";
import { PublicacionesContext } from "../context/PublicacionesContext";
import { UserContext } from "../context/UserContext";
import Card from "../components/Card";

const categorias = ["todas", "Artes visuales", "Artes plásticas", "Servicios"];

const Home = () => {
  const { publicaciones, setPublicaciones } = useContext(PublicacionesContext);
  const { usuario } = useContext(UserContext);
  const [filtro, setFiltro] = useState("todas");

  // Asegura que publicaciones siempre sea un array
  const publicacionesArray = Array.isArray(publicaciones) ? publicaciones : [];

  // Filtrado robusto por categoría
  const publicacionesFiltradas =
    filtro === "todas"
      ? publicacionesArray
      : publicacionesArray.filter(
          (obra) =>
            obra.categoria &&
            obra.categoria.toLowerCase().trim() === filtro.toLowerCase().trim()
        );

  return (
    <div>
      <div
        className="hero-home text-center py-5 mb-4"
        style={{
          background: "linear-gradient(90deg, #a8caba 0%, #fff7f0 100%)",
          borderRadius: "30px",
          boxShadow: "0 4px 16px 0 rgba(60,40,10,0.06)",
          marginBottom: "2rem",
        }}
      >
        <h1 className="display-5 fw-bold" style={{ color: "#5d4157" }}>
          Bienvenido a Galería Creativa
        </h1>
        <p
          className="lead"
          style={{ color: "#2d2d2d", maxWidth: 650, margin: "0 auto" }}
        >
          Descubre, comparte y vende arte hecho con pasión.<br />
          Explora por categoría, encuentra obras y servicios únicos.
        </p>
      </div>

      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn ${filtro === cat ? "btn-dark" : "btn-outline-dark"}`}
            style={{
              borderRadius: "20px",
              padding: "6px 16px",
              fontWeight: "600",
              letterSpacing: "1px",
              minWidth: "140px",
            }}
            onClick={() => setFiltro(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="row">
        {publicacionesFiltradas.length === 0 ? (
          <div className="col-12 text-center text-muted">
            No hay publicaciones para mostrar.
          </div>
        ) : (
          publicacionesFiltradas
            .filter((obra) => obra && obra.id) // Filtra elementos válidos
            .map((obra) => (
              <div className="col-md-4 mb-4" key={obra.id}>
                <Card
                  obra={obra}
                  usuario={usuario}
                  setPublicaciones={setPublicaciones}
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
