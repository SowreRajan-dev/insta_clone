const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWTRANDOMKEY, (error, payload) => {
      if (error) {
        return res
          .status(401)
          .json({ error: "you must be logged in", err: error });
      }
      const { _id } = payload;
      User.findById(_id).then((userData) => {
        req.user = userData;
        next();
      });
    });
  }
};
