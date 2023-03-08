const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul harus diisi"],
      minlength: 3,
      maxlength: 50,
    },
    statusService: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
