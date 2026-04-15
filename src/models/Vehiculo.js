import mongoose from "mongoose";

const { Schema } = mongoose;

const vehiculoSchema = new Schema(
  {
    placa: {
      type: String,
      required: [true, "La placa es obligatoria"],
      trim: true,
      uppercase: true,
      minlength: [6, "Mínimo 6 caracteres"],
      maxlength: [10, "Máximo 10 caracteres"],
      match: [/^[A-Z0-9]+$/, "Solo letras y números sin espacios"],
      unique: true,
    },

    marca: {
      type: String,
      required: [true, "La marca es obligatoria"],
      trim: true,
      maxlength: [50, "Máximo 50 caracteres"],
    },

    modelo: {
      type: String,
      required: [true, "El modelo es obligatorio"],
      trim: true,
      maxlength: [50, "Máximo 50 caracteres"],
    },

    anio: {
      type: Number,
      required: [true, "El año es obligatorio"],
      min: [1900, "Año inválido"],
      max: [new Date().getFullYear() + 1, "Año no válido"],
    },

    mantenimientos: [
      {
        fecha: {
          type: Date,
          default: Date.now,
        },
        tipo: {
          type: String,
          trim: true,
          maxlength: [100, "Máximo 100 caracteres"],
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* 🔥 NORMALIZAR DATOS ANTES DE GUARDAR */
vehiculoSchema.pre("save", function () {
  if (this.placa) this.placa = this.placa.toUpperCase().trim();
  if (this.marca) this.marca = this.marca.trim();
  if (this.modelo) this.modelo = this.modelo.trim();
});

/* 🔥 NORMALIZAR EN ACTUALIZACIÓN */
vehiculoSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update?.placa) update.placa = update.placa.toUpperCase().trim();
  if (update?.marca) update.marca = update.marca.trim();
  if (update?.modelo) update.modelo = update.modelo.trim();
});

/* 🔥 LIMPIAR RESPUESTA JSON */
vehiculoSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Vehiculo ||
  mongoose.model("Vehiculo", vehiculoSchema);