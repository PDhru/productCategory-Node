const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect(
    "mongodb+srv://dhrutip2005:12345@cluster0.68clxij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connected Successfully");
};

module.exports = db;
