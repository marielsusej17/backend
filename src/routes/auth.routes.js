import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

/* ========================
   CREATE USER
======================== */
router.post("/create", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailClean = email.trim().toLowerCase();

    const existing = await User.findOne({ email: emailClean });
    if (existing) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: emailClean,
      password: hashedPassword,
      role: "admin",
    });

    res.json({
      message: "Usuario creado",
      user: {
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/* ========================
   LOGIN
======================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailClean = email.trim().toLowerCase();

    const user = await User.findOne({ email: emailClean });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;