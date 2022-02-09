const express = require("express");
// const mongoose =require("mongoose");
const router = new express.Router();
const app = express();
const userDetModel=require("./userDet");
router.use(express.json())
router.use(express.urlencoded({extended:false}));
router.get("/", (req, res) => {
    // res.send("this is the home page");
    res.render("index")
})
router.get("/registration", (req, res) => {
    // res.send("this is the registration page");
    res.render("registrationPage");
})
router.get("/login",(req,res)=>{
    res.render("loginPage");
})
router.post("/registration", async (req,res)=>{
    try{
        if(req.body.password===req.body.cnfmPassword){
            console.log(req.body);
            res.render("login");
            const saveUserDet=new userDetModel(req.body);
            await saveUserDet.save();
        }
        else{
            res.send("password didn't matche");
        }
    }catch (err){
            console.log(err);
    }
})


module.exports = router; 