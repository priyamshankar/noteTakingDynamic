const mongoose = require("mongoose");
const userDetSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    city:String,
    state:String,
    zip:Number,
    password:String,
    cnfmPassword:String
})
const userDetModel=new mongoose.model("userDetails",userDetSchema);
module.exports=userDetModel;