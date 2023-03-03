const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    departemen: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    namaPeralatan: {
      type: String,
      required: true,
    },
    kodePeralatan: {
      type: String,
      required: true,
    },
    permasalahan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema)