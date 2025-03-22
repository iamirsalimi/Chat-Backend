const express = require("express");
const controller = require("./../controllers/User.controller");

const router = express.Router();

router.post("/", controller.auth);
router.get("/me", controller.me);

module.exports = router;
