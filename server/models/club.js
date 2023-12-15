const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
    },
    clubId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
