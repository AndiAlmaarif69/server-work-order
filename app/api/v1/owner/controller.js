const { StatusCodes } = require("http-status-codes");
const {
  createOwner,
  createUsers,
  getAllUsers,
} = require("../../../services/mongoose/users");

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSOwner = async (req, res, next) => {
  try {
    const result = await createOwner(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
    console.log(err)
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
    console.log(err)
  }
};

module.exports = {
  createCMSOwner,
  createCMSUser,
  getCMSUsers
};