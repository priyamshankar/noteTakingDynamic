const express=require("express");
// const mongoose =require("mongoose");
const router=new express.Router();

router.get("/",(req,res)=>{
    res.send("this is the home page");
})
router.get("/registration",(req,res)=>{
    res.send("this is the registration page");
})

module.exports=router;