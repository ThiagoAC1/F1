import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/escuderias")
      .then((res) => res.json())
      .then((data) => setEquipos(data.sort((a, b) => b.puntos - a.puntos)))
      .catch((err) => console.error("Error cargando escuderías:", err));
  }, []);

  return (
    <>
      <h2 className="page-title">Escuderías F1 2025</h2>
      {equipos.map((equipo) => (
        <div key={equipo.id} className="team-card">
          <img src={equipo.logo} alt={equipo.nombre} className="team-image" />
          <div className="team-info">
            <h3>{equipo.nombre}</h3>
            <p>Puntos: {equipo.puntos}</p>
            <Link to={`/escuderias/${equipo.id}`}>Ver más</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Equipos;
