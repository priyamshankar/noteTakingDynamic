const express=require("express");
// const mongoose =require("mongoose");
const router=new express.Router();

router.get("/",(req,res)=>{
    res.send("this is the home page");
})

module.exports=router;