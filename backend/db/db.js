const mongoose = require("mongoose");

function connrctToDB() {
  mongoose
    .connect(process.env.CONNECT_DB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));
}

module.exports = connrctToDB;
