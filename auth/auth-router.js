const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");

//POST /api/auth/register
router.post("/register", (req, res, next) => {
  const user = req.body;
  //hashed password into user.password
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
  //adds the username and password with hashedpassword now
  User.add(user)
    .then((newUser) => {
      console.log("newUser---->", newUser, req.session);
      if (newUser) {
        res.status(201).json({ new_user_created: newUser });
      } else {
        res.status(404).json({ cant_post_user: "Can not post the user" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//POST /api/auth/login
router.post("/login", (req, res, next) => {
  const credentials = req.body;
  console.log("credentials------------------------>", credentials);

  User.findBy({ username: credentials.username })
    .then((user) => {
      console.log("logged in user----->", user);
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // add the req.session cookie here and add user to it
        req.session.user = user;
        console.log(`req.session.user---->`, req.session.user, req.session);

        res.json({ logged_in: `welcome ${user.username}, have cookie` });
      } else {
        res.json({ no_credentcials: `Please enter correct credentials` });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//GET /api/auth/logout
//log out and destroy cookie
router.get("/logout", (req, res) => {
  console.log("logging out endpoint------->");
  if (req.session) {
    req.session.destroy((err) => {
      err
        ? res.json({ message: "you cant logout yet" })
        : res.json({ message: "logged out" });
    });
  } else {
    res.json({ message: "this user doesn't even exist at all" });
  }
});

module.exports = router;
