const fs = require("fs");
const path = require("path");
const processed_message = require("../models/message.js");

const processPayloads = async () => {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  for (let file of files) {
    if (file.endsWith(".json")) {
      const jsonData = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));

      // Messages payload
      if (jsonData.metaData?.entry[0]?.changes[0]?.value?.messages) {
        const value = jsonData.metaData.entry[0].changes[0].value;
        const contact = value.contacts?.[0];
        const msg = value.messages?.[0];

        await processed_message.updateOne(
          { messageId: msg.id },
          {
            wa_id: contact.wa_id,
            name: contact.profile.name,
            text: msg.text.body,
            timestamp: msg.timestamp,
            messageId: msg.id
          },
          { upsert: true }
        );
      }

      // Status payload
      if (jsonData.metaData?.entry[0]?.changes[0]?.value?.statuses) {
        const statusData = jsonData.metaData.entry[0].changes[0].value.statuses[0];
        await processed_message.updateOne(
          { messageId: statusData.id },
          { status: statusData.status }
        );
      }
    }
  }
};

module.exports = processPayloads