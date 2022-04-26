const express = require("express");
const app = express();
const passport = require("passport");

const gAuthModel = require("./googleAuth.js");

app.get(
  "/auth/google",passport.authenticate("google", { scope: ["profile"] })
);

app.get('/login',passport.authenticate('google'),(req,res)=>{
    res.send('this is the login page')
});

app.get ('/',(req,res)=>{
    res.send('this is the loginpage');
});

// const passport=require("passport");
// const res = require("express/lib/response");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// console.log('helloworld');
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "144932216066-f9aoqihlsrq1a2oosvpibo6p2mtaubd0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/login",
    },
    // function(accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //   });
    // }
    (accessToken, refreshToken, profile, cb) => {
      // console.log(user.id);
      console.log("google fnc called");
      //   return cb(err, profile);
      console.log(profile);
      console.log(profile.id);
      new gAuthModel({
        firstName: profile.displayName,
        googleId: profile.id,
      }).save();

      // try{
      //   const token = await profile.generateAuthToken();
      //   res.cookie("jwt", token);
      // }catch(err){
      //   res.send('error');
      //   console.log(err);
      // }
    }
  )
);

app.listen(process.env.PORT || 9000, function () {
  console.log("Server started on port 9000 on ");
});
