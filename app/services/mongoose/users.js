const Users = require("../../api/v1/users/model");
const Owner = require("../../api/v1/owner/model");
const { BadRequestError } = require("../../errors");

const createOwner = async (req) => {
  const { owner, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan confirmPassword tidak cocok");
  }

  const result = await Owner.create({ owner });

  const users = await Users.create({
    email,
    name,
    password,
    owner: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    owner: req.user.owner,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

module.exports = { createOwner, createUsers, getAllUsers };
