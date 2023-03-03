const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
      minlength: 3,
      maxlength: 50,
    },
    departemen: {
      type: String,
      required: [true, "Departemen harus diisi"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Departemen harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "-",
    },
  },
  { timestamps: true }
);

participantSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

participantSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Participant", participantSchema);