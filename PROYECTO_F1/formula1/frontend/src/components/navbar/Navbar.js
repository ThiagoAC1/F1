// components/navbar/Navbar.js
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">F1 2025</div>
        <ul className="navbar-menu">
          <li><Link to="/">🏁 Inicio</Link></li>
          <li><Link to="/calendar">📅 Calendario</Link></li>
          <li><Link to="/fastest-laps">🏎️ Vueltas Rápidas</Link></li>
          <li><Link to="/drivers">🚥 Pilotos</Link></li>
          <li><Link to="/teams">🔧 Equipos</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
