import { createContext, useState, useEffect } from "react";

// 1. Crear el contexto
export const UserContext = createContext();

// 2. Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Este efecto se ejecuta al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    console.log("🟡 [UserProvider] usuario en localStorage:", usuarioGuardado);

    if (usuarioGuardado) {
      try {
        const usuarioParseado = JSON.parse(usuarioGuardado);
        console.log("🟢 [UserProvider] usuario parseado:", usuarioParseado);
        setUsuario(usuarioParseado);
      } catch (error) {
        console.error("❌ Error al parsear usuario guardado:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const login = (usuario) => {
    console.log("🔐 [login] Guardando usuario en contexto:", usuario);
    setUsuario(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", usuario.token);
  };

  const logout = () => {
    console.log("🚪 [logout] Cerrando sesión");
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
