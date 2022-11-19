const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    from: { type: ObjectId, ref: "User" },
    profile_name: { type: String },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    profile_url: { type: String },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
