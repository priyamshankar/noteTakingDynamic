const userDetModel = require("../database/userDet");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // console.log(process.env.TOKEN_KEY);
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userDetModel.findOne({ _id: verifyUser._id });
    // console.log(user);
    req.token = token;
    req.user = user;
    // console.log(req.token)
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = auth;
