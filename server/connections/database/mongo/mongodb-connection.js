const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGOCONNECTIONSTRING + "app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

connectToMongoDB();

module.exports = mongoose.connection;
