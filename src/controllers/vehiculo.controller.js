export const getVehiculos = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = q
      ? {
          $or: [
            { placa: { $regex: q, $options: "i" } },
            { marca: { $regex: q, $options: "i" } },
            { modelo: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      Vehiculo.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Vehiculo.countDocuments(filter),
    ]);

    return res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (err) {
    next(err);
  }
};