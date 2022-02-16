require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userDetSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    city: String,
    state: String,
    zip: Number,
    password: String,
    cnfmPassword: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userDetSchema.methods.generateAuthToken = async function () {
    try {
        // console.log(this._id);
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.TOKEN_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        // console.log(token);
        // console.log(this.firstName);
        return token;
    } catch (error) {
        console.log(error);
        console.log("error");
        res.send(error);
    }
}

const userDetModel = new mongoose.model("userDetails1", userDetSchema);
module.exports = userDetModel;