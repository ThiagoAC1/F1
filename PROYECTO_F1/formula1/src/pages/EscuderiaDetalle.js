import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EscuderiaDetalle = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/escuderias/${id}`)
      .then((res) => res.json())
      .then((data) => setEquipo(data))
      .catch((err) => console.error("Error cargando escudería:", err));
  }, [id]);

  if (!equipo) return <p>Cargando...</p>;

  return (
    <div className="detalle-equipo">
      <img src={equipo.logo} alt={equipo.nombre} className="logo-detalle" />
      <h2>{equipo.nombre}</h2>
      <p><strong>Puntos:</strong> {equipo.puntos}</p>
      <p><strong>País:</strong> {equipo.pais}</p>
      <p><strong>Fundación:</strong> {equipo.fundacion}</p>
      <p><strong>Chasis:</strong> {equipo.chasis}</p>
      <p><strong>Motor:</strong> {equipo.motor}</p>
      <p><strong>Sede:</strong> {equipo.sede}</p>
      <p><strong>Pilotos:</strong> {equipo.pilotos.join(" y ")}</p>
      <p>{equipo.descripcion}</p>
    </div>
  );
};

export default EscuderiaDetalle;
