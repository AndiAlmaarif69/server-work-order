const Service = require("../../api/v1/service/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createService = async (req) => {
  const { title, image, statusService } = req.body;

  const check = await Service.findOne({ title, owner: req.user.owner });

  if (check) throw new BadRequestError("judul event duplikat");

  const result = await Service.create({
    title,
    image,
    statusService,
    title, owner: req.user.owner
  });

  return result;
};

const getAllService = async (req) => {
  const { keyword, status } = req.query;

  let condition = { owner: req.user.owner };

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (["Draft", "Published"].includes(status)) {
    condition = {
      ...condition,
      statusService: status,
    };
  }

  const result = await Service.find(condition).populate({
    path: "image",
    select: "_id name",
  });

  return result;
};

const getOneService = async (req) => {
  const { id } = req.params;

  const result = await Service.findOne({
    _id: id,
    owner: req.user.owner,
  }).populate({ path: "image", select: "_id name" });

  return result;
};

const updateService = async (req) => {
  const { id } = req.params;

  const { title, image, statusService } = req.body;

  const check = await Service.findOne({
    title,
    _id: { $ne: id },
    owner: req.user.owner,
  });

  if (check) throw new BadRequestError("Judul service duplikat");

  const result = await Service.findOneAndUpdate(
    { _id: id },
    {
      title,
      image,
      statusService,
      title, owner: req.user.owner
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada service dengan id : ${id}`);

  return result;
};

const deleteService = async (req) => {
  const { id } = req.params;

  const result = await Service.findOne({
    _id: id,
    owner: req.user.owner,
  });

  return result;
};

const changeStatusService = async (req) => {
  const { id } = req.params;
  const { statusService } = req.body;

  if (!["Draft", "Published"].includes(statusService)) {
    throw new BadRequestError("Status harus Draft atau Published");
  }

  const checkService = await Service.findOne({
    _id: id,
    owner: req.user.owner,
  });

  if (!checkService)
    throw new NotFoundError(`Tidak ada acara dengan id: ${id}`);

  checkService.statusService = statusService;
  await checkService.save();

  return checkService;
};

module.exports = {
  createService,
  getAllService,
  getOneService,
  updateService,
  deleteService,
  changeStatusService,
};
