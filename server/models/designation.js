const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema(
  {
    designationName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Designation", designationSchema);
