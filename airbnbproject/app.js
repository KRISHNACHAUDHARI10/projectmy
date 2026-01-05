const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const session = require("express-session");
const hostRouter = require("./router/hostrouter");
const storeRouter = require("./router/storerouter");
const authRouter = require("./router/authrouter");
const MongoDBStore = require('connect-mongodb-session')(session);
const Mongo_db_url = "mongodb://127.0.0.1:27017/bnbproject";

const sessionStorage = new MongoDBStore({

  uri: Mongo_db_url,
  collection: 'sessions',

})
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'Mern Live Bartch', resave: false, saveUninitialized: true, store: sessionStorage }));

app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {

  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();

})
app.use("/host", hostRouter);

const PORT = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/bnbproject").then(() => {
  console.log("mongodb is connected")
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

