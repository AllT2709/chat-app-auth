const User = require("../../models/User");

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      return res.status(200).json({ success: true, user });
    })
    .catch((err) => next(err));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      return res.status(200).json({ success: true, users });
    })
    .catch((err) => next(err));
};
