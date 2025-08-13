const express = require("express");
const handleWebhook = require("../controllers/webhook.js");

const router = express.Router();

router.post("/", handleWebhook);

module.exports = router;
