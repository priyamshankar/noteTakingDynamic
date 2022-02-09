const express = require("express");
// const mongoose =require("mongoose");
const router = new express.Router();
const app = express();

router.get("/", (req, res) => {
    // res.send("this is the home page");
    res.render("index")
})
router.get("/registration", (req, res) => {
    // res.send("this is the registration page");
    res.render("registrationPage");
})

module.exports = router; 