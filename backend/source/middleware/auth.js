const userDetModel = require("../database/userDet");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const user = await userDetModel.findOne({ _id: req.cookies.id });
    if (user == null) {
      res.redirect("/login");
    } else {
      const token = req.cookies.jwt;
      const verifyUser = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await userDetModel.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = auth;
