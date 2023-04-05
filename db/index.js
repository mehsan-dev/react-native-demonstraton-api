require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {});

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Mongodb connected successfully");
  });
};