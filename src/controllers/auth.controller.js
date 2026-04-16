import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    console.log("📩 BODY RECIBIDO:", req.body);

    const { email, password } = req.body;

    /* ========================
       VALIDACIONES
    ======================== */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const emailClean = email.trim().toLowerCase();

    /* ========================
       BUSCAR USUARIO
    ======================== */
    const user = await User.findOne({ email: emailClean });

    console.log("👤 USER ENCONTRADO:", user);

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    /* ========================
       VALIDAR PASSWORD
    ======================== */
    const validPassword = await bcrypt.compare(
      password.trim(),
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    /* ========================
       VALIDAR ENV
    ======================== */
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET no definido");
      return res.status(500).json({
        message: "Error de configuración del servidor",
      });
    }

    /* ========================
       GENERAR TOKEN
    ======================== */
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    /* ========================
       RESPUESTA
    ======================== */
    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("❌ ERROR LOGIN:", error);

    return res.status(500).json({
      message: "Error del servidor",
      error: error.message, // 🔥 útil para debug en local
    });
  }
};