const express =require("express");
const ejs=require('ejs');
const app=express();
const path=require("path");
const port=process.env.PORT ||3000;
const router=require("./database/connection");
const dbconnection=require("./database/dbConnection");
// const router=express.Router();

const frontend_path = path.join(__dirname, "../../frontend/views");
app.set("views", frontend_path);
// ejs.registerpar
app.set('view engine','ejs');
app.listen(port,()=>{
    console.log("localhost connected");
})
app.use(router);