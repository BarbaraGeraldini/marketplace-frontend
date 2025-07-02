import api from './api';

export const login = async (correo, contraseña) => {
  const res = await api.post("/usuarios/login", { correo, contraseña });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

