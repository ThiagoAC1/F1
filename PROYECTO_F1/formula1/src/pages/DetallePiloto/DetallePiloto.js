import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetallePiloto.css";

function DetallePiloto() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [piloto, setPiloto] = useState(null);

  useEffect(() => {
    fetch("/data/pilotos2025.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find(
          (p) => p.nombre.toLowerCase() === decodeURIComponent(nombre).toLowerCase()
        );
        setPiloto(encontrado);
      });
  }, [nombre]);

  if (!piloto) {
    return <p>Cargando datos del piloto...</p>;
  }

  return (
    <div className="detalle-piloto">
      <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-card">
        <img src={piloto.imagen} alt={piloto.nombre} className="detalle-img" />
        <div className="detalle-info">
          <h2>{piloto.nombre}</h2>
          <p><strong>Número:</strong> {piloto.numero}</p>
          <p><strong>Equipo:</strong> {piloto.equipo}</p>
          <p><strong>Puntos:</strong> {piloto.puntos}</p>
          <p><strong>Nacionalidad:</strong> {piloto.nacionalidad}</p>
          <p><strong>Historia:</strong> {piloto.historia}</p>
        </div>
      </div>
    </div>
  );
}

export default DetallePiloto;
