require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

//server file
const server = express();

//import routers WELCOME, USERS, AUTH
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

//SESSIONS CONFIG
const sessionConfig = {
  name: `sessionID`,
  secret: process.env.SESSION_SECRET || `You can't have the secret`,
  cookie: {
    maxAge: 1000 * 60,
    secure: false,
    //Note be careful when setting this to true, as compliant
    //clients will not allow client-side JavaScript to see the
    //cookie in document.cookie.
    httpOnly: true,
  },
  //save the session and cookie without warning the user client??
  resave: false,
  saveUninitialized: false,
  //--------------------------------------------------------------
  //STORE KnexSessionStore in the Database after seeeing up session
  store: new KnexSessionStore({
    knex: require("../database/dbConfig"),
    tablename: "sessions",
    sidfieldname: "session_ids",
    createtable: true,
    clearInterval: 1000 * 60, // 1 minute
  }),
};

//global middleware
server.use(session(sessionConfig));
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
