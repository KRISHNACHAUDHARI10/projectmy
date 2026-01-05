const express = require("express");
const authRouter = express.Router();
const autcontroler = require("../controler/authcontroler");


authRouter.get("/login", autcontroler.getlogin);
authRouter.post("/login", autcontroler.postlogin);
authRouter.post("/logout", autcontroler.postlogout);
authRouter.get("/signup", autcontroler.getSignup);
authRouter.post("/signup", autcontroler.postSignup);
module.exports = authRouter;