const express = require("express");
const { createMessage, getMessages } = require("../controller/messageController");

const router = express.Router();

router
    .post("/",createMessage)
    .get("/:chatId",getMessages)

module.exports = router;