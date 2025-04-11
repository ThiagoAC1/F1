import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 👈 Agregamos esto
import "./Piloto.css";

function Pilotos() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    fetch("/data/pilotos2025.json")
      .then((res) => res.json())
      .then((data) => setPilotos(data))
      .catch((err) => console.error("Error cargando pilotos:", err));
  }, []);

  return (
    <div className="pilotos-container">
      <div className="pilotos-grid">
        {pilotos.map((piloto, index) => (
          <Link
            to={`/drivers/${encodeURIComponent(piloto.nombre)}`} // 👈 URL segura
            key={index}
            className="piloto-card"
          >
            <img src={piloto.imagen} alt={piloto.nombre} className="piloto-img" />
            <h3>{piloto.nombre}</h3>
            <p>Número: {piloto.numero}</p>
            <p>Equipo: {piloto.equipo}</p>
            <p>Puntos: {piloto.puntos}</p>
            <p>Nacionalidad: {piloto.nacionalidad}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Pilotos;
