const Orders = require("../../api/v1/order/model");

const getAllOrders = async (req) => {
  // Membuat request berdasarkan query (limit, page, startDate, endDate)
  const { limit = 10, page = 1 } = req.query;

  // Menampung objek
  let condition = {};

  // Menampilkan getAllOrders
  const result = await Orders.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  // Melakukan return hasil getAllOrders
  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = {
  getAllOrders,
};
