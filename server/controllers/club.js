const Club = require("../models/club");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add Club
exports.createClub = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Create Club ------------------");
    const { clubName, clubId } = req.body;
    if (clubName.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Club name length should be less than 30!",
      });
    }
    let club = await Club.findOne({
      clubName: new RegExp(`^${clubName}`, "i"),
    });
    if (club) {
      return res
        .status(400)
        .json({ success: false, message: "Club name already exist!" });
    }
    let clubID = await Club.findOne({
        clubId
      });
      if (clubID) {
        return res
          .status(400)
          .json({ success: false, message: "Club id already exist!" });
      }

    await Club.create({
      clubName,
      clubId,
    });
    res.status(200).json({
      success: true,
      message: "Club added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all clubs
exports.getAllClubs = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("----------------Fetching clubs-------------------------");
    const club = await Club.find();
    res.status(201).json({
      success: true,
      club,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete club
exports.deleteClub = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete Club ------------------");
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res
        .status(400)
        .json({ success: false, message: "Club does not exist!" });
    }

    await Club.deleteOne({
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
