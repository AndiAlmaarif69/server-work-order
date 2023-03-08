const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    dataOrderCustomer: {
      customer: {
        type: String,
        required: [true, "Please provide firstName"],
        minlength: 3,
        maxlength: 50,
      },
      departemen: {
        type: String,
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
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
