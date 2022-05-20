const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/notePadForm").then(()=>{
    console.log("dbConnected");
}).catch((err)=>{
    console.log(err);
});