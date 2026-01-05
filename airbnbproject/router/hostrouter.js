const express = require("express");
const hostController = require("../controler/hostcontroler");

const router = express.Router();

router.get("/add-home", hostController.getHome);
router.post("/add-home", hostController.posthome);
router.get("/hosthomes", hostController.gethosthome);
router.get("/homes/:homeId", hostController.getHomeDetails);
module.exports = router;
