const mongoose = require("mongoose");

function mongooseConnectDB(uri) {
  mongoose.connect(uri, () => {
    console.log("connected")
  })
};

module.exports = mongooseConnectDB;