const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  text: String,
  timestamp: String,
  status:  { type: String, default: "sent" },
  messageId: String
});

const processed_message = mongoose.model("processed_message", MessageSchema);
module.exports = processed_message
