const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/gAuthentication").then(()=>{
    console.log("dbConnected");
}).catch((err)=>{
    console.log(err);
});


const googleAuthSchema=new mongoose.Schema({
    displayName:String,
    googleId:String,
    Gtokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


const gAuthModel=new mongoose.model('googleAuth',googleAuthSchema);
module.exports=gAuthModel;