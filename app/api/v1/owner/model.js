// (1) import package mongoose
const mongoose = require("mongoose");

// (2) ambil module model dan Schema dari package mongoose
const { model, Schema } = mongoose;

let ownerSchema = Schema(
  {
    owner: {
      type: String,
      required: [true, "Pemilik web harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Owner", ownerSchema);