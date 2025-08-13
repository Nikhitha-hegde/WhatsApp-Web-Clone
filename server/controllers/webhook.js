const processed_message = require("../models/message.js");

const handleWebhook = async (req, res) => {
  const body = req.body;

  if (body.metaData?.entry[0]?.changes[0]?.value?.messages) {
    const value = body.metaData.entry[0].changes[0].value;
    const contact = value.contacts?.[0];
    const msg = value.messages?.[0];
    const timestampSeconds = msg.timestamp.length > 10
      ? Math.floor(Number(msg.timestamp) / 1000).toString()
      : msg.timestamp;

    await processed_message.updateOne(
      { messageId: msg.id },
      {
        wa_id: contact.wa_id,
        name: contact.profile.name,
        text: msg.text.body,
        timestamp: timestampSeconds,
        status: "sent",
        messageId: msg.id
      },
      { upsert: true }
    );
  }

  if (body.metaData?.entry[0]?.changes[0]?.value?.statuses) {
    const statusData = body.metaData.entry[0].changes[0].value.statuses[0];
    await processed_message.updateOne(
      { messageId: statusData.id },
      { status: statusData.status }
    );
  }

  res.sendStatus(200);
};
module.exports = handleWebhook

/* JSON-Body to update the status only by backend from postman
{
  "metaData": {
    "entry": [
      {
        "changes": [
          {
            "value": {
              "statuses": [
                {
                  "id": "messageId(in the db)",
                  "status": "read" (delivered or sent)
                }
              ]
            }
          }
        ]
      }
    ]
  }
}

*/