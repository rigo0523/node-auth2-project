const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const { restricted } = require(`../middleware/restricted-middleware`);

//GET /api/users
router.get("/", restricted(), (req, res, next) => {
  // if the user is an admin they an see all users
  //if the user is not an admin they can only see themselves
  console.log("decoded=================>", req.decodedToken);
  const { subID, role } = req.decodedToken;
  console.log("role------------>", role);
  if (role === "admin") {
    Users.find()
      .then((user) => {
        console.log("users----->", user);
        res.json(user);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // if student, can only see own self login user info, not list of users
    Users.findById(subID)
      .then((selfUser) => {
        res.status(200).json({ self_user: selfUser });
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
