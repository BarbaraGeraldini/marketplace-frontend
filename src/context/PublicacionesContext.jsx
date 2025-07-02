import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PublicacionesContext = createContext();

const PublicacionesProvider = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  // Cargar publicaciones desde el backend al iniciar
  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/publicaciones`);
        setPublicaciones(res.data);
      } catch (error) {
        console.error("Error al obtener publicaciones desde API:", error);
      }
    };

    obtenerPublicaciones();
  }, []);

  // Agregar una nueva publicación enviándola al backend
  const agregarPublicacion = async (publicacion) => {
    const token = localStorage.getItem("token"); // Recuperar el token almacenado
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/publicaciones`,
        publicacion,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        }
      );
      console.log("Publicación agregada:", response.data);
    } catch (error) {
      console.error("Error al agregar publicación:", error);
    }
  };

  return (
    <PublicacionesContext.Provider value={{ publicaciones, setPublicaciones, agregarPublicacion }}>
      {children}
    </PublicacionesContext.Provider>
  );
};

export default PublicacionesProvider;


