import { useEffect, useState } from "react";

function FastestLaps() {
    const [laps, setLaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/vueltas-rapidas")
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
    }, []);

    return (
        <div>
            <h1>Vueltas Rápidas F1</h1>
            {loading && <p>Cargando vueltas rápidas...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {laps.length > 0 ? (
                    laps.map((lap, index) => (
                        <ul key={index}>{lap.driver} | {lap.car} | {lap.time}</ul>
                    ))
                ) : (
                    !loading && <p>No hay datos disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default FastestLaps;
