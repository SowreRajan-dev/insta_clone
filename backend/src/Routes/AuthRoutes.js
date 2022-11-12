const User = require("../Models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");

//*register a user
router.post("/signup", (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !fullname || !password) {
    res
      .status(422)
      .json({ error: "Please add all the required fields correctly" });
  }

  User.findOne({ username: username }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Email Already Exists" });
    }
    bcrypt
      .hash(password, 15)
      .then((hashedPassword) => {
        const user = new User({
          username: username,
          password: hashedPassword,
          fullname: fullname,
        });

        user
          .save()
          .then((user) => {
            return res
              .status(200)
              .json({ message: "user created successfully", user: user });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });
});

//* login user
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "please provide correct credentials" });
  }
  User.findOne({ username: username })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(442).json({ error: "Invalid Credentials" });
      }
      bcrypt.compare(password, savedUser.password).then((valid) => {
        if (!valid)
          return res
            .status(422)
            .json({ error: "Invalid Username and password" });
        const token = jsonwebtoken.sign(
          { _id: savedUser._id },
          process.env.JWTRANDOMKEY
        );

        const {
          _id,
          fullname,
          username,
          following,
          followers,
          active,
          profile,
        } = savedUser;

        res.status(200).json({
          token: token,
          user: {
            _id,
            fullname,
            username,
            following,
            followers,
            active,
            profile,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
