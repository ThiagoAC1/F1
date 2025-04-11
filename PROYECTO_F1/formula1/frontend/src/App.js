import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FastestLaps from "./pages/fastestlaps/FastestLaps";
import Navbar from "./components/navbar/Navbar"; // ✅ Usamos el nombre correcto
import Calendario from "./pages/calendario/Calendario";
import Pilotos from "./pages/Pilotos/Piloto";
import DetallePiloto from "./pages/DetallePiloto/DetallePiloto";
import ScrollToTopButton from "./components/ScrollToTopButtonn/ScrollToTopButton";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar con enlaces usando <Link /> */}
        <Navbar />

        {/* Contenido según la ruta */}
        <div className="content-wrapper">
          <Routes>
            <Route
              path="/"
              element={<h2 className="page-title">Próximas Carreras</h2>}
            />
            <Route
              path="/fastest-laps"
              element={
                <>
                  <h2 className="page-title">Vueltas Rápidas</h2>
                  <FastestLaps />
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
            <Route path="/drivers" element={<Pilotos />} />
            <Route path="/drivers/:nombre" element={<DetallePiloto />} />
            {/* Ruta de ejemplo si querés agregar equipos después */}
            {/* <Route path="/teams" element={<Equipos />} /> */}
          </Routes>
        </div>

        {/* Botón para volver arriba */}
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
