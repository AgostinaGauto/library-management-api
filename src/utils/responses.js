const successResponse = (res, status, data) => {
  return res.status(status).json(data);
};

const errorResponse = (res, status, message) => {
  return res.status(status).json({ message });
};

module.exports = {
  successResponse,
  errorResponse
};