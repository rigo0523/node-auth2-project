function restricted() {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res
        .status(403)
        .json({ Error: "You Shall Not Pass, Please login first!!!!" });
    }
  };
}

module.exports = {
  restricted,
};
