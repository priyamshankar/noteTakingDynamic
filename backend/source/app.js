const express =require("express");
const app=express();
const port=process.env.PORT || 8000;
const router=require("./database/connection");
const dbconnection=require("./database/dbConnection");
// const router=express.Router();
app.set('view engine','ejs');
app.listen(port,()=>{
    console.log("localhost connected");
})
app.use(router);