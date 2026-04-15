import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;

  // ✔ validar header
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No autenticado",
    });
  }

  // ✔ extraer token
  const token = auth.split(" ")[1];

  try {
    // ✔ verificar token (CORRECTO: verify)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // guardar usuario en request
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};