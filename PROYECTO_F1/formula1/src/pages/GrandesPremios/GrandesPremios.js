import React from "react";
import datosGrandesPremios from "../../data/grandesPremios2025.json";

function GrandesPremios() {
  return (
    <div className="grandes-premios">
      {datosGrandesPremios.map((gp, index) => (
        <div key={index} className="circuito">
          <img src={gp.imagen} alt={`Imagen circuito ${gp.nombre}`} />
          <div className="info">
            <h3>{gp.nombre}</h3>
            <p><strong>Ubicación:</strong> {gp.ubicacion}</p>
            <p><strong>Año de inauguración:</strong> {gp.añoInauguracion}</p>
            <p><strong>Mayor ganador:</strong> {gp.mayorGanador}</p>
            <p><strong>Historia:</strong> {gp.historia}</p>
            <p><strong>Vueltas:</strong> {gp.vueltas}</p>
            <p><strong>Distancia por vuelta:</strong> {gp.distanciaPorVuelta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GrandesPremios;

