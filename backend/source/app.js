const express =require("express");
const ejs=require('ejs');
const app=express();
const path=require("path");
const port=process.env.PORT ||3000;
const router=require("./database/connection");
const dbconnection=require("./database/dbConnection");
// const router=express.Router();

const frontend_path = path.join(__dirname, "../../frontend/views");
const static_path = path.join(__dirname, "../../frontend/partials");

app.set("views", frontend_path);
// app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.use(express.static(static_path));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.listen(port,()=>{
    console.log("localhost connected");
})

app.use(router);