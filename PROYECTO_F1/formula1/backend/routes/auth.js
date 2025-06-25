const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

// Login local
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !user.password) return res.status(401).send("Credenciales inválidas");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Contraseña incorrecta");

  req.login(user, (err) => {
    if (err) return res.status(500).send("Error en sesión");
    res.json({ message: "Login exitoso", user });
  });
});


// Registro local
router.post("/register", async (req, res) => {
  const { email, password, nombre } = req.body; // ← incluir nombre
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hash, nombre }); // ← pasar nombre
    res.json(user);
  } catch (err) {
    console.error("Error al registrar:", err); // ← importante para debug
    res.status(400).send("Usuario ya existe");
  }
});

// En routes/auth.js
router.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Elimina la cookie de sesión
      res.json({ message: "Sesión cerrada" });
    });
  });
});


// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
}), (req, res) => {
  res.redirect("http://localhost:3000"); // Frontend
});
// Ruta para obtener usuario autenticado
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    // Passport guarda el usuario en req.user
    res.json(req.user);
  } else {
    res.status(401).json({ error: "No autenticado" });
  }
});


module.exports = router;
