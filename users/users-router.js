const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const { restricted } = require(`../middleware/restricted-middleware`);

//GET /api/users
router.get("/", (req, res, next) => {
  Users.find()
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
