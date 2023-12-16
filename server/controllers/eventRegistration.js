const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Register for event
exports.registerForEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Register for event------------------");
    const { eventId, userId, payment } = req.body;
    const event = await Post.findById(eventId);
    const user = await User.findById(userId);
    if (!event || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Event or user not found." });
    }
    const isRegistered = event.registeredUser.some(
      (user) => user.userId === userId
    );
    if (isRegistered) {
      return res.status(400).json({
        success: false,
        message: "User is already registered for the event!",
      });
    }

    let myCloud;
    if (payment) {
      myCloud = await cloudinary.v2.uploader.upload(payment, {
        folder: "payments",
      });
    }
    event.registeredUser.push({
      userId,
    });

    await event.save();
    res.status(201).json({
      success: true,
      message: "User registered for the event successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Registered users list
exports.getAllRegistered = catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("--------------Fetching registered users info------------------");
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found!' });
      }
      const userIds = post.registeredUser.map(user => user.userId);
      const users = await User.find({ _id: { $in: userIds } });
        const registeredUsersWithInfo = post.registeredUser.map(user => {
        const userInfo = users.find(u => u._id.toString() === user.userId);
        return {
          userId: user.userId,
          paymentPublicId: user.paymentPublicId,
          url: user.url,
          userInfo: userInfo, 
        };
      });
      res.status(200).json({ success: true, registeredUsersWithInfo });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });