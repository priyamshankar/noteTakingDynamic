const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const auth = require("../middleware/auth");
// const router = express();
const router = new express.Router();
const userDetModel = require("./userDet");
const bcrypt = require("bcryptjs");
// const mongoose =require("mongoose");
require("./dbConnection");
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  const user = await userDetModel.findOne({ _id: req.cookies.id });
  res.render("index", {
    cookie: req.cookies.jwt,
    users: user,
  });
  //   console.log(user);
  // console.log(req.cookies.jwt);
  console.log(user);
});

router.get("/registration", (req, res) => {
  res.render("registrationPage");
});

router.post("/registration", async (req, res) => {
  try {
    const fetchPwd = req.body.password;
    const secPwd = await bcrypt.hash(fetchPwd, 10);
    const pwComp = await bcrypt.compare(req.body.cnfmPassword, secPwd);
    if (pwComp) {
      // console.log(req.body);
      const saveUserDet = new userDetModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        password: secPwd,
        cnfmPassword: secPwd,
      });
      console.log(saveUserDet);
      await saveUserDet.save();
      const token = await saveUserDet.generateAuthToken(); //generateAuthToken is user defined
      res.cookie(`jwt register`, token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });
      res.render("loginPage");
    } else {
      res.send("password didn't matche");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.render("loginPage");
  // console.log(req.cookies.jwt);
});

router.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const loginDetDb = await userDetModel.findOne({ userName: userName });
    const password = req.body.password;
    const pwComp = await bcrypt.compare(password, loginDetDb.password);
    // console.log(loginDetDb);
    if (pwComp) {
      const token = await loginDetDb.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      res.cookie("id", loginDetDb._id, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      // res.render("index");
      res.redirect("/");
      // res.render("authenticate");
      // console.log(token);
    } else {
      res.send("password or user id wrong");
    }
  } catch (err) {
    res.send("error");
    console.log(err);
  }
});

router.get("/authenticate", auth, (req, res) => {
  res.render("authenticate", {
    users: req.user,
  });
  // console.log(req.user.firstName);
});

router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentToken) => {
      // console.log(currentToken.token);
      // console.log(req.token);
      return currentToken.token !== req.token;
    });
    await res.clearCookie("jwt");
    await res.clearCookie("id");
    await req.user.save();
    res.render("loginPage");
    console.log("logout successfully");
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
try {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.client_ID,
        clientSecret: process.env.client_sec,
        callbackURL: "/google",
      },
      async (accestoken, refreshtoken, profile, done) => {
        const userId = profile.emails[0].value;

        const loginDetDb = await userDetModel.findOne({
          userName: userId,
        });
        // console.log(loginDetDb);
        if (loginDetDb) {
          userToken = await loginDetDb.generateAuthToken();
          console.log("already a user");
          done(null, loginDetDb);
        } else {
          const saveGUserDet = new userDetModel({
            firstName: profile.name.givenName,
            googleId: profile.id,
            lastName: profile.name.familyName,
            userName: profile.emails[0].value,
          });
          await saveGUserDet.save();
          userToken = await saveGUserDet.generateAuthToken();
          console.log("new user");
          done(null, saveGUserDet);
        }
      }
    )
  );
} catch (err) {
  console.log("caught the error manually this is conosle.log");
  console.log(err);
}

passport.serializeUser((user, done) => {
  use = user;
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDetModel.findById(id).then((user) => {
    done(null, user);
  });
});

router.get("/google", passport.authenticate("google"), (req, res) => {
  res.cookie(`jwt`, userToken, {
    httpOnly: true,
  });
  res.cookie("id", use._id, {
    httpOnly: true,
  });
  res.redirect("/");
});

router.get("/note", auth, async (req, res) => {
  const user = await userDetModel.findOne({ _id: req.cookies.id });
  res.render("notePg", {
    cookie: req.cookies.jwt,
    users: user,
  });
  // res.send("this is the note page");
});

router.get("/noteapi", auth, async (req, res) => {
  const noteData = await userDetModel.findOne({ _id: req.cookies.id });
  res.send(noteData);
});

router.post("/note", auth, async (req, res) => {
  try {
    const noteDet = await userDetModel.findOne({ _id: req.cookies.id });
    noteDet.notes = noteDet.notes.concat({
      title: req.body.titleObj,
      bodyCont: req.body.contentObj,
    });
    res.render("notePg");
    await noteDet.save();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.patch("/noteapi", auth, async (req, res) => {
  try {
    const noteDet = await userDetModel.findOne({ _id: req.cookies.id });
    // delete functionality
    if (req.body.func == "del") {
      let index = req.body.index;
      noteDet.notes.splice(index, 1);
    }
    //favourite index...
    if (req.body.func == "fav") {
      let favIndex = req.body.favIndex;
      // console.log(favIndex);
      if (noteDet.notes[favIndex].fav == false) {
        noteDet.notes[favIndex].fav = true;
      } else {
        noteDet.notes[favIndex].fav = false;
      }
    }

    if (req.body.func == "rmFav") {
      let rmIndex = req.body.rmFavIndex;
      noteDet.notes[rmIndex].fav = false;
    }

    await noteDet.save();
    res.render("notePg");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = router;
