const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};

module.exports = { connectDb };
