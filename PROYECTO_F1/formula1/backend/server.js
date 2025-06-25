const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Conexión a base de datos y modelos
const sequelize = require("./config/database");
require("./models/User"); // Modelo de usuario
require("./config/passport"); // Configuración de Passport

const authRoutes = require("./routes/auth");

const app = express();

// CORS para permitir frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Configuración de sesión
app.use(session({
  secret: process.env.JWT_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas API
app.get("/vueltas-rapidas/:year", (req, res) => {
  const year = req.params.year || 2025;
  const filePath = path.join(__dirname, `vueltas${year}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer archivo:", err);
      return res.status(500).json({ error: "No se pudieron obtener los datos" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json.fastestLaps);
    } catch (parseError) {
      console.error("Error al parsear JSON:", parseError);
      res.status(500).json({ error: "Error al parsear los datos" });
    }
  });
});

app.get("/escuderias", (req, res) => {
  try {
    const rawData = fs.readFileSync("./escuderias2025.json", "utf8");
    const escuderias = JSON.parse(rawData);
    res.json(escuderias);
  } catch (err) {
    console.error("Error al leer escuderías:", err);
    res.status(500).json({ error: "No se pudieron cargar las escuderías" });
  }
});

app.get("/escuderias/:id", (req, res) => {
  const id = req.params.id;
  try {
    const rawData = fs.readFileSync("./escuderias2025.json", "utf8");
    const escuderias = JSON.parse(rawData);
    const equipo = escuderias.find((e) => e.id === id);

    if (!equipo) {
      return res.status(404).json({ error: "Escudería no encontrada" });
    }

    res.json(equipo);
  } catch (err) {
    console.error("Error al obtener escudería:", err);
    res.status(500).json({ error: "No se pudo obtener la escudería" });
  }
});

// Rutas de autenticación
app.use("/auth", authRoutes);

// Conectar base de datos y levantar servidor
sequelize.sync({ alter: true })  // o { force: true } si estás en desarrollo sin datos
  .then(() => {
    console.log("✅ Base de datos sincronizada");
    app.listen(5000, () => {
      console.log("✅ Servidor corriendo en http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ Error al sincronizar BD:", err);
  });
