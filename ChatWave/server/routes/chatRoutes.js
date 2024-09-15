const express = require("express");
const { createChat, findUserChats, findChat } = require("../controller/chatController");

const router = express.Router();

router
    .post("/",createChat)
    .get("/:userId",findUserChats)
    .get("/:firstId/:secondId",findChat)

module.exports = router;