import React, { useEffect, useState } from "react";
import PilotosCard from "../../components/pilotoCard/PilotosCards";
import "./Pilotos.css";

const Pilotos = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/yashkathe/F1-API-JSON/main/drivers.json")
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((err) => console.error("Error cargando datos de pilotos", err));
  }, []);

  return (
    <div className="pilotos-container">
      <h2 className="page-title">Pilotos F1 2025</h2>
      <div className="pilotos-grid">
        {drivers.map((driver, index) => (
          <PilotosCard key={index} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default Pilotos;
