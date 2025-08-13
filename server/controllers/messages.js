const processed_message = require("../models/message.js");

const getChats = async (req, res) => {
  try {
    const chats = await processed_message.aggregate([
      { $sort: { timestamp: 1 } },
      {
        $group: {
          _id: "$wa_id",
          name: { $first: "$name" },
          lastMessage: { $last: "$text" },
          lastTimestamp: { $last: "$timestamp" }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessagesByWaId = async (req, res) => {
  try {
    const wa_id = req.params.wa_id;
    const messages = await processed_message.find({ wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { wa_id, name, text } = req.body;
    const timestampSeconds = Math.floor(Date.now() / 1000).toString();
    const newMessage = await processed_message.create({
      wa_id,
      name,
      text,
      timestamp: timestampSeconds,
      status: "sent",
      messageId: `local-${timestampSeconds}`
    });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {sendMessage, getMessagesByWaId, getChats}