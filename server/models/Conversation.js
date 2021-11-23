const { Schema, model } = require("mongoose");

const ConverstionSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = model("conversation", ConverstionSchema);
