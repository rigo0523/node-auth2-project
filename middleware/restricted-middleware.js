const jwt = require("jsonwebtoken");
require("dotenv").config();

function restricted() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token in restricted-------->", token);
    // see if there is a token
    //check if it is valid
    //reash the header + payload + secrete and see if it matches our verify signature
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log("err in verify token middleware----->", err);
          res
            .status(401)
            .json({ message: "not verified, not the right token" });
        } else {
          //token is valid here
          req.decodedToken = decodedToken;
          console.log("decodedToken------>", decodedToken);
          next();
        }
      });
    } else {
      res.status(400).json({ message: "no token provided, please enter one" });
    }
  };
}

module.exports = {
  restricted,
};
