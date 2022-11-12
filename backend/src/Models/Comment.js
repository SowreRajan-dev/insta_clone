const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    from: { type: String },
    profile_name: { type: String },
    likes: { type: Number, default: 0 },
    profile_url: { type: String },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
