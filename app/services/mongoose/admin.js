const Admin = require("../../api/v1/admin/model");
const { BadRequestError } = require("../../errors");

const createAdmin = async (req, res) => {
  const { name, password, confirmPassword, username } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Admin.create({
    name,
    username,
    password,
  });

  return result;
};

const getAllAdmin = async (req) => {
  const result = await Admin.find();

  return result;
};

module.exports = { createAdmin, getAllAdmin };
