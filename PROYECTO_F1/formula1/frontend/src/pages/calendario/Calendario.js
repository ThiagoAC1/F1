// src/pages/calendario/Calendario.js

import React from 'react';
import calendarData from '../../data/calendarData';
import CountdownTimer from '../../components/Countdown/CountdownTimer';
import './calendario.css';

const getNextRaceDate = () => {
  const now = new Date();
  for (let gp of calendarData) {
    if (gp.race) {
      const raceDate = new Date(gp.race);
      if (raceDate > now) {
        return raceDate;
      }
    }
  }
  return null;
};

const Calendario = () => {
  const nextRaceDate = getNextRaceDate();

  return (
    <div className="calendario-container">
      <h1 className="calendario-title">Calendario F1 2025</h1>

      {nextRaceDate && (
        <div className="contador-box">
          <h2 className="contador-titulo">Cuenta regresiva para la próxima carrera</h2>
          <CountdownTimer targetDate={nextRaceDate} />
        </div>
      )}

      {calendarData.map((gp, index) => (
        <div key={index} className="gp-card">
          <h3>GP de {gp.gp}</h3>
          <ul>
            {gp.fp1 && <li>FP1: {new Date(gp.fp1).toLocaleString()}</li>}
            {gp.sprintShootout && <li>Sprint Shootout: {new Date(gp.sprintShootout).toLocaleString()}</li>}
            {gp.sprint && <li>Sprint: {new Date(gp.sprint).toLocaleString()}</li>}
            {gp.qualifying && <li>Clasificación: {new Date(gp.qualifying).toLocaleString()}</li>}
            {gp.race && <li>Carrera: {new Date(gp.race).toLocaleString()}</li>}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Calendario;
