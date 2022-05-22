const mongoose=require("mongoose");
const db='mongodb+srv://priyamshankar:4JsHAAtzXn96B5F@cluster0.2shsn.mongodb.net/notePadDatabase?retryWrites=true&w=majority';
mongoose.connect(db).then(()=>{
    console.log("dbConnected");
}).catch((err)=>{
    console.log(err);
});