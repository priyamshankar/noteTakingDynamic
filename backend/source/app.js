const express =require("express");
const app=express();
const port=process.env.PORT || 8000;
require("./database/connection");
const router=express.Router();
app.listen(port,()=>{
    console.log("connected");
})
app.use(router);