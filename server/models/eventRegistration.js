const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: Object,
    },
    uniqueId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventRegistration", eventRegistration);
