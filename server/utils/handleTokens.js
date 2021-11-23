const jwt = require("jsonwebtoken");

exports.signData = async (data) => {
  const userSigned = await jwt.sign(data, process.env.JWT_SECRET);
  return userSigned;
};

exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

exports.getTokenFrom = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};
