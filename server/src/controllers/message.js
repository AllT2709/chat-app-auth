const Message = require("../../models/Message");

exports.addMessage = (req, res, next) => {
  Message.create(req.body)
    .then((message) => {
      return res.status(200).json({ success: true, message });
    })
    .catch((err) => next(err));
};

exports.getMessages = (req, res, next) => {
  Message.find({
    conversation: req.params.conversationId,
  })
    .then((messages) => {
      return res.status(200).json({ success: true, messages });
    })
    .catch((err) => next(err));
};
