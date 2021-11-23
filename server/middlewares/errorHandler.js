const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  return res.status(statusCode || 500).json({
    success: false,
    error: err.name,
    message,
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
  });
};

module.exports = { errorHandler, notFound };
