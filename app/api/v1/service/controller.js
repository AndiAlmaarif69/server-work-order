const { StatusCodes } = require("http-status-codes");
const { createService, getAllService, updateService, deleteService, getOneService, changeStatusService } = require("../../../services/mongoose/service")

const create = async (req, res, next) => {
    try {
        const result = await createService(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllService(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const find = async (req, res, next) => {
    try {
      const result = await getOneService(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

const update = async (req,res,next) => {
    try {
        const result = await updateService(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteService(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

const changeStatus = async (req, res, next) => {
    try {
      const result = await changeStatusService(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    index,
    find,
    update,
    destroy,
    create,
    changeStatus
}