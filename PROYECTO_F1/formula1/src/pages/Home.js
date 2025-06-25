import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [nextRace, setNextRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        setLoading(true);
        // Usar la nueva ruta que ya devuelve solo la próxima carrera
        const res = await api.get("/proxima-carrera");
        setNextRace(res.data);
      } catch (err) {
        console.error("Error al cargar próxima carrera:", err);
        setError("No se pudo cargar la información de la próxima carrera");
      } finally {
        setLoading(false);
      }
    };

    fetchNextRace();
  }, []);

  if (loading) {
    return (
      <div className="content-wrapper">
        <h1 className="page-title">Bienvenido a F1 2025</h1>
        <p>Cargando próxima carrera...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <h1 className="page-title">Bienvenido a F1 2025</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <h1 className="page-title">Bienvenido a F1 2025</h1>

      {nextRace ? (
        <div className="circuito">
          <img 
            src={nextRace.imagen} 
            alt={nextRace.nombre}
            onError={(e) => {
              e.target.src = '/images/placeholder-circuit.jpg';
            }}
          />
          <div className="info">
            <h3>Próxima Carrera: {nextRace.nombre}</h3>
            <p><strong>Fecha:</strong> {new Date(nextRace.fecha).toLocaleDateString('es-ES')}</p>
            <p><strong>Ubicación:</strong> {nextRace.pais} - {nextRace.circuito}</p>
            <Link to={`/grandes-premios`} className="btn-ver-detalles">
              Ver más sobre el circuito
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-races">
          <h3>No hay carreras programadas</h3>
          <p>El calendario de la temporada 2025 será actualizado próximamente.</p>
          <Link to="/grandes-premios" className="btn-ver-detalles">
            Ver todos los Grandes Premios
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;