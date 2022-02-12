const userDetModel = require("../database/userDet");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        // console.log(process.env.TOKEN_KEY);
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.TOKEN_KEY);
        const user=userDetModel.findOne({_id:verifyUser._id});
        console.log(user._id);
        next();
    } catch (err) {
        console.log(err);
    }
}
module.exports = auth;