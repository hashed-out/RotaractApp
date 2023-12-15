const Designation = require("../models/designation");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add Designation
exports.createDesignation = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Create Designation ------------------");
    const { designationName } = req.body;
    let designation = await Designation.findOne({ designationName });
    if (designation) {
      return res
        .status(400)
        .json({ success: false, message: "Designation already exist!" });
    }
    designation = await Designation.create({
      designationName,
    });
    res.status(200).json({
      success: true,
      message: "Designation added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all designation
exports.getAllDesignation = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "----------------Fetching designation-------------------------"
    );
    const designation = await Designation.find();
    res.status(201).json({
      success: true,
      designation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete designation
exports.deleteDesignation = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete Designation ------------------");
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res
        .status(400)
        .json({ success: false, message: "Designation does not exist!" });
    }

    await Designation.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
