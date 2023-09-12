const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (URL) => {
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
