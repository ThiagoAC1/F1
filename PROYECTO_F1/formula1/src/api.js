import axios from "axios";
export const obtenerCalendario = async () => {
  const res = await fetch("http://localhost:5000/schedule");
  return res.json();
};

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // MUY IMPORTANTE para sesiones
});

export default api;
