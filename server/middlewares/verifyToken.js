const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const { getTokenFrom, verifyToken } = require("../utils/handleTokens");

const protectedRoute = async (req, res, next) => {
  let token = getTokenFrom(req);
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  let decode = await verifyToken(token, next);
  if (decode.name) {
    return next(new ErrorResponse("Your Session has expired", 401));
  }

  User.findById(decode.id)
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse("No user found with this id", 404));
      }
      req.user = user;
      next();
    })
    .catch((err) => next(new ErrorResponse(err.message, 401)));
};

module.exports = protectedRoute;
