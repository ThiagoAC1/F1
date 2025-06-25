import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FastestLaps from "./pages/fastestlaps/FastestLaps";
import Navbar from "./components/navbar/Navbar";
import Calendario from "./pages/calendario/Calendario";
import Pilotos from "./pages/Pilotos/Piloto";
import DetallePiloto from "./pages/DetallePiloto/DetallePiloto";
import ScrollToTopButton from "./components/ScrollToTopButtonn/ScrollToTopButton";
import GrandesPremios from "./pages/GrandesPremios/GrandesPremios";
import Equipos from './pages/Equipos';
import EscuderiaDetalle from './pages/EscuderiaDetalle';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <div className="content-wrapper">
          <Routes>
            <Route
              path="/home"
              element={<h2 className="page-title">Próximas Carreras</h2>}
            />
            <Route
              path="/fastest-laps"
              element={
                <>
                  <h2 className="page-title">Vueltas Rápidas</h2>
                  <FastestLaps year={2025} />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <h2 className="page-title">Calendario 2025</h2>
                  <Calendario />
                </>
              }
            />
            <Route
              path="/grandes-premios"
              element={
                <>
                  <h2 className="page-title">Grandes Premios</h2>
                  <GrandesPremios />
                </>
              }
            />
            <Route path="/drivers" element={<Pilotos />} />
            <Route path="/drivers/:nombre" element={<DetallePiloto />} />
            <Route path="/teams" element={<Equipos />} />
            <Route path="/escuderias/:id" element={<EscuderiaDetalle />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>

        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
