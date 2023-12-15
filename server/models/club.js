const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    clubName: {
      type: Object,
    },
    uniqueId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
