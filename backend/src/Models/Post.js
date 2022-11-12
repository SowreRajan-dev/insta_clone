const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    likes: {
      type: String,
      default: 0,
    },
    profile_name: {
      type: String,
    },
    image_url: {
      type: String,
    },
    profile_url: { type: String },
    posted_by: {
      type: ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Object,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
