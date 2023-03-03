const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Lengkap harus diisi"],
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  const Admin = this;
  if (Admin.isModified("password")) {
    Admin.password = await bcrypt.hash(Admin.password, 12);
  }
  next();
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", adminSchema);