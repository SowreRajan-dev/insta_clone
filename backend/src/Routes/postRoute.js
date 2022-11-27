const router = require("express").Router();
const Post = require("../Models/Post");
const comment = require("../Models/Comment");
const requireLogin = require("../Middleware/requireLogin");

// * getting all posts
router.get("/allposts", (req, res) => {
  Post.find()
    .populate("posted_by", "_id username profile")
    .populate("comments.postedBy", "_id username profile")
    .sort("-createdAt")
    .then((posts) => {
      res.status(200).json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//* get all followed posts
router.get("/allfollowedpost", requireLogin, (req, res) => {
  Post.find({
    posted_by: {
      $in: req.user.following,
    },
  })
    .populate("posted_by", "_id username profile")
    .populate("comments.postedBy", "_id username")
    .sort("-createdAt")
    .then((posts) => {
      res.status(200).json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//  * post new post
router.post("/createPost", requireLogin, (req, res) => {
  const { title, post_desc, image_url } = req.body;
  if (!title || !post_desc || !image_url) {
    return res
      .status(422)
      .json({ error: "Plz Add images and title (add all the fields)" });
  }

  const post = new Post({
    title: title,
    post_desc: post_desc,
    image_url: image_url,
    posted_by: req.user,
  });

  post
    .save()
    .then((result) => {
      res.status(200).json({ post: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

// * current user posts

router.get("/myprofile", requireLogin, (req, res) => {
  Post.find({ posted_by: req.user._id })
    .populate("posted_by", "_id ")
    .then((mypost) => {
      res.status(200).json({ mypost: mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

// * like a post
router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $addToSet: { likes: req.body.userId },
    },
    { new: true }
  ).exec((error, result) => {
    if (error) {
      return res.status(422).json({ error: error });
    } else {
      return res.status(200).json(result);
    }
  });
});

// * unlike a post
router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.body.userId },
    },
    {
      new: true,
    }
  ).exec((error, result) => {
    if (error) {
      return res.status(422).json({ error: error });
    } else {
      return res.json(result);
    }
  });
});

// *Comment Functionality
router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        comments: comment,
      },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id username profile")
    .populate("posted_by", "_id profile_name")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

// * delete a post
router.delete("/delete/:postId", requireLogin, (req, res) => {
  Post.findOne({
    _id: req.params.postId,
  })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }

      if (post.posted_by._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
