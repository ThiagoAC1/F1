export const obtenerCalendario = async () => {
  const res = await fetch("http://localhost:5000/schedule");
  return res.json();
};
