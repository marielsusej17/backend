export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const emailClean = email.trim().toLowerCase();

    const user = await User.findOne({ email: emailClean });

    console.log("👤 USER ENCONTRADO:", user);

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
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" } // 🔥 FIX IMPORTANTE
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};