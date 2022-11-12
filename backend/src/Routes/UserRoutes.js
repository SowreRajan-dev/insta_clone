const requireLogin = require("../Middleware/requireLogin");
const Post = require("../Models/Post");
const User = require("../Models/User");
const router = require("express").Router();

//* get a specific user
router.get("/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    User.findOne({ _id: id })
      .select("-password")
      .then((user) => {
        Post.find({
          posted_by: id,
        })
          .populate("posted_by", "_id name")
          .exec((error, posts) => {
            if (error) {
              return res.status(422).json({ error: error });
            }
            res.status(200).json({ user, posts });
          });
      });
  } catch (err) {
    return res.status(404).json({
      error: "User not found",
      err: err,
    });
  }
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  if (req.body.userId === id) {
    try {
      User.findByIdAndUpdate(id, {
        $set: req.body,
      }).then((user) => {
        return res.status(200).json({
          updatedUser: user,
        });
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(404).json({
      error: "You can update only your account",
    });
  }
});

// * Follow a user
router.put("/follow", requireLogin, (req, res) => {
  const { followId } = req.body;
  User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: req.user._id },
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// * unfollow user
router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

module.exports = router;
