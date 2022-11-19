const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    title: { type: String },
    image_url: {
      type: String,
    },
    posted_by: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    post_desc: { type: String },
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
