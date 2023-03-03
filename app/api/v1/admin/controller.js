const { StatusCodes } = require("http-status-codes");
const { createAdmin } = require("../../../services/mongoose/admin");

const createCMSAdmin = async (req, res, next) => {
  try {
    const result = await createAdmin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSAdmin,
};