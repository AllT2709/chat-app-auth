const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("message", MessageSchema);
