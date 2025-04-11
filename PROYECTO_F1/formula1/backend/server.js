const express = require("express");
const cors = require("cors");
const f1Api = require("f1-api-node");

const app = express();
app.use(cors());

app.get("/vueltas-rapidas", async (req, res) => {
    try {
        const year = 2025; // Cambia el año según necesidad
        const fastestLaps = await f1Api.getFastestLaps(year);
        res.json(fastestLaps);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las vueltas rápidas" });
    }
});

app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
