const Participant = require("../../api/v1/participant/model");
const Service = require("../../api/v1/service/model");
const Order = require("../../api/v1/order/model");

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");

const { createTokenParticipant, createJWT } = require("../../utils");

const signupParticipant = async (req) => {
  const { name, departemen, password, confirmPassword, email, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password tidak cocok");
  }

  const result = await Participant.create({
    name,
    departemen,
    email,
    password,
    confirmPassword,
    role,
  });

  delete result._doc.password;

  return result;
};

const signinParticipant = async (req) => {
  // Membuat request body untuk username dan password
  const { email, password } = req.body;

  // melakukan check, jika email dan password tidak ada maka akan memberikan message BadRequestError
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // melakukan check participant berdasarkan username
  const result = await Participant.findOne({ email: email });

  // Jika participant tidak ada, maka akan memberikan message UnauthorizedError
  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  // Jika password benar, maka akan di compare
  const isPasswordCorrect = await result.comparePassword(password);

  // Jika password salah, maka akan diberikan message pada UnauthorizedError
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  // setelah password di compare, maka akan dibuatkan token
  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllService = async (req) => {
  const result = await Service.findOne({ _id: id }).populate(image);

  if (!result) throw new NotFoundError(`Tidak ada serivce dengan id: ${id}`);

  return result;
};

const getOneService = async (req) => {
  const { id } = req.params;

  const result = await Service.findOne({ _id: id }).populate("image");

  if (!result) throw new NotFoundError(`Tidak ada service dengan id : ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await Order.find({ participant: req.participant.id });

  return result;
};

module.exports = {
  signupParticipant,
  signinParticipant,
  getAllService,
  getAllOrders,
  getOneService,
};
