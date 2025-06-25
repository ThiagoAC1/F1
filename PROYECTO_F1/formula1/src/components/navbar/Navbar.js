import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import api from "../../api";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Obtener usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">F1 2025</div>
        <ul className="navbar-menu">
<              li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Inicio</NavLink></li>
          {/* Menú Grandes Premios */}
          <li className="dropdown">
            <span className="dropdown-toggle">Grandes Premios</span>
            <ul className="dropdown-menu">
              <ul><NavLink to="/calendar">Calendario</NavLink></ul>
              <ul><NavLink to="/fastest-laps">Vueltas Rápidas</NavLink></ul>
              <ul><NavLink to="/grandes-premios">Pistas</NavLink></ul>
            </ul>
          </li>

          {/* Menú Escuderías */}
          <li className="dropdown">
            <span className="dropdown-toggle">Escuderías</span>
            <ul className="dropdown-menu">
              <li><NavLink to="/teams">Escuderías</NavLink></li>
              <li><NavLink to="/drivers">Pilotos</NavLink></li>
            </ul>
          </li>

          {/* Usuario logueado */}
          {user ? (
            <li className="dropdown user-dropdown">
              <span className="dropdown-toggle">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="avatar" />
                ) : (
                  "👤"
                )}{" "}
                {user.name}
              </span>
              <ul className="dropdown-menu">
                <li><NavLink to="/perfil">Mi Perfil</NavLink></li>
                <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
              </ul>
            </li>
          ) : (
            <>
              <li><NavLink to="/login">Iniciar sesión</NavLink></li>
              <li><NavLink to="/register">Registrarse</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
