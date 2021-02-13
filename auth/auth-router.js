const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../users/users-model");

//POST /api/auth/register   --> user = {username: "", password: ""}
router.post("/register", (req, res, next) => {
  const user = req.body;
  //hashed password into user.password
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
  //adds the username and password with hashedpassword now
  User.add(user)
    .then((newUser) => {
      console.log("newUser---->", newUser);
      const token = generateToken(newUser);
      console.log("token register----->", token);
      if (newUser) {
        res.status(201).json({ newUser, token });
      } else {
        res.status(404).json({ cant_post_user: "Can not post the user" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//POST /api/auth/login --> user = {username: "", password: ""}
router.post("/login", (req, res, next) => {
  const credentials = req.body;

  User.findBy({ username: credentials.username })
    .then((user) => {
      console.log("logged in user----->", user);
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // add TOKEN jwt
        const token = generateToken(user);
        res.json({ logged_in: `welcome ${user.username}, have cookie`, token });
      } else {
        res.json({ no_credentcials: `Please enter correct credentials` });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//TOKENS
function generateToken(user) {
  //payload
  const payload = {
    subID: user.id,
    username: user.username,
    role: user.role,
  };
  //options
  const options = {
    expiresIn: "1d",
  };
  //return jwt.sign
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
