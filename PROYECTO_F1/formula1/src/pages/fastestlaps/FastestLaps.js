import { useEffect, useState } from "react";

function FastestLaps({ year = 2025 }) {
  const [laps, setLaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/vueltas-rapidas/${year}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        return res.json();
      })
      .then((data) => {
        setLaps(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [year]);

  return (
    <div>
      <h1>Vueltas Rápidas F1 {year}</h1>

      {loading && <p>Cargando vueltas rápidas...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && laps.length === 0 && <p>No hay datos disponibles</p>}

      <ul>
        {laps.map((lap, idx) => (
          <li key={idx} style={{ marginBottom: "1em" }}>
            <strong>GP:</strong> {lap.gp} <br />
            <strong>Pista:</strong> {lap.pista} <br />
            <strong>Piloto:</strong> {lap.piloto} ({lap.escuderia}) <br />
            <strong>Vuelta Rápida:</strong> {lap.vueltaRapida.tiempo} en la vuelta {lap.vueltaRapida.vuelta} <br />
            <strong>Mejor Vuelta Histórica:</strong> {lap.mejorVueltaHistorica.tiempo} por {lap.mejorVueltaHistorica.piloto} ({lap.mejorVueltaHistorica.año})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FastestLaps;
