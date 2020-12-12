require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//server file
const server = express();

//import routers WELCOME, USERS, AUTH
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

//global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

//server endpionts ----------------------------->
//GET Welcome router PORT 5000
server.use("/", welcomeRouter);
//GET /api/users
server.use("/api/users", usersRouter);
//POST /api/auth/regist  && /api/auth/login && /api/auth/logout
server.use("/api/auth", authRouter);
//<---------------------------------------------

//global middleware for catch 500 error
server.use((err, req, res, next) => {
  console.log("505 error----->", err);
  res.status(500).json({ Error: "500 Error, what happened?" });
});

module.exports = server;
