import { useContext } from "react";
// ✅ Requerimiento 4: Uso del hook useContext

import { UserContext } from "../context/UserContext";
// ✅ Requerimiento 5: Accedemos al estado global del usuario

import { PublicacionesContext } from "../context/PublicacionesContext";
// ✅ Requerimiento 5: Accedemos al estado global de publicaciones

import Card from "../components/Card";
// ✅ Requerimiento 3: Reutilizamos el componente Card
import axios from "axios";

const Perfil = () => {
  const { usuario } = useContext(UserContext); // Solo usuario, no setUsuario
  const { publicaciones, setPublicaciones } = useContext(PublicacionesContext);

  if (!usuario) {
    return <p className="text-center">Debes iniciar sesión para ver tu perfil.</p>;
  }

  // Filtrar publicaciones del usuario logueado
  const misPublicaciones = publicaciones.filter(
    (obra) => obra.autor === usuario.nombre
  );

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
        if (typeof setPublicaciones === "function") {
          setPublicaciones((prev) => prev.filter((pub) => pub.id !== obra.id));
        }
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        alert("Ocurrió un error al intentar eliminar la publicación.");
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Mi Perfil</h2>

      {/* Información del usuario */}
      <div className="mb-4 p-3 border rounded bg-light">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
      </div>

      {/* Publicaciones del usuario */}
      <h4 className="mb-3">Mis Publicaciones</h4>
      {misPublicaciones.length === 0 ? (
        <p>Aún no has creado publicaciones.</p>
      ) : (
        <div className="row">
          {misPublicaciones
            .filter((obra) => obra && obra.id) // Filtra elementos válidos
            .map((obra) => (
              <div className="col-md-4 mb-4" key={obra.id}>
                <Card
                  obra={obra}
                  usuario={usuario}
                  setPublicaciones={setPublicaciones}
                  onEliminar={handleEliminar}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Perfil;

