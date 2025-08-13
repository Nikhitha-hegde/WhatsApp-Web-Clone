const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const processPayloads = require("./utils/processPayloads.js")
const connectDB = require('./db/connect')
const webhookRoutes = require("./routes/webhook.js");
const messageRoutes = require("./routes/messages.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/webhook", webhookRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await processPayloads();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
