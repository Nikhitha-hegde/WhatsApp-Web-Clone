const express = require("express");
const { getChats, getMessagesByWaId, sendMessage } = require("../controllers/messages.js");

const router = express.Router();

router.get("/", getChats);
router.get("/:wa_id", getMessagesByWaId);
router.post("/", sendMessage);

module.exports = router;
