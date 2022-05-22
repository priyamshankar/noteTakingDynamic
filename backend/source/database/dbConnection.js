const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.mongod;
mongoose
  .connect(db)
  .then(() => {
    console.log("dbConnected");
  })
  .catch((err) => {
    console.log(err);
  });
