const express = require("express");
const storeController = require("../controler/storecontroler");

const router = express.Router();

router.get("/", storeController.getIndex);

module.exports = router;
