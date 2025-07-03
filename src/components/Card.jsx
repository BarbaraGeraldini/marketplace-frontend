import { Link } from "react-router-dom";

const Card = ({ obra }) => (
  <div className="card shadow-sm border-0" style={{ borderRadius: "18px", background: "#fff7f0" }}>
    <img
      src={obra.imagen_url}
      className="card-img-top"
      alt={obra.titulo}
      style={{
        objectFit: "cover",
        width: "100%",
        minHeight: "210px",
        maxHeight: "210px",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        background: "#e2e2e2"
      }}
      onError={e => e.target.src = "https://placehold.co/400x210?text=Imagen+no+disponible"}
    />
    <div className="card-body">
      <h5 className="card-title">{obra.titulo}</h5>
      <p className="card-text text-muted"><strong>Autor:</strong> {obra.autor}</p>
      <p className="card-text"><strong>Categoría:</strong> {obra.categoria}</p>
      <Link to={`/detalle/${obra.id}`} className="btn btn-outline-dark w-100" style={{ borderRadius: "16px" }}>
        Ver Detalle
      </Link>
    </div>
  </div>
);

export default Card;
