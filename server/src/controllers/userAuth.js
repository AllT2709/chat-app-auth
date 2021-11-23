const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const {
  encryptPassword,
  decryptPassword,
} = require("../../utils/handlePassword");
const { signData } = require("../../utils/handleTokens");

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const passwordHashed = await encryptPassword(password);
  User.create({ username, email, password: passwordHashed })
    .then((user) => {
      res.status(201).json({ success: true, user });
    })
    .catch((err) => next(err));
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return next(new ErrorResponse("Invalid credetials", 401));
      }
      const isMatchPass = await decryptPassword(password, user.password);
      if (!isMatchPass) {
        return next(new ErrorResponse("Invalid password", 401));
      }
      const token = await signData({ id: user._id, username: user.username });
      return res.status(200).json({
        success: true,
        token,
        user: { id: user._id, username: user.username },
      });
    })
    .catch((err) => {
      return next(err);
    });
};
