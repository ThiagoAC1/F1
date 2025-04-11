import { Link } from "react-router-dom";
import "./Piloto.css";

function PilotoCard({ piloto }) {
  return (
    <Link to={`/piloto/${encodeURIComponent(piloto.nombre)}`} className="piloto-card">
      <img src={piloto.imagen} alt={piloto.nombre} className="piloto-img" />
      <h3>{piloto.nombre}</h3>
      <p>Número: {piloto.numero}</p>
      <p>Equipo: {piloto.equipo}</p>
      <p>Puntos: {piloto.puntos}</p>
      <p>Nacionalidad: {piloto.nacionalidad}</p>
    </Link>
  );
}

export default PilotoCard;
