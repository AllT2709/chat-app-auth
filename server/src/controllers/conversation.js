const Conversation = require("../../models/Conversation");

exports.newConversation = (req, res, next) => {
  Conversation.create({ members: [req.body.senderId, req.body.receiverId] })
    .then((newConv) => {
      return res.status(200).json({ success: true, conversation: newConv });
    })
    .catch((err) => next(err));
};

exports.getConv = (req, res, next) => {
  Conversation.find({
    members: { $in: [/* req.params.userId */ req.user._id] },
  })
    .then((conv) => {
      return res.status(200).json({ success: true, conversations: conv });
    })
    .catch((err) => next(err));
};

exports.getConvofTwoUsers = (req, res, next) => {
  Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  })
    .then((conv) => {
      return res.status(200).json({ success: true, conversation: conv });
    })
    .catch((err) => next(err));
};
