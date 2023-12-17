const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const cloudinary = require("cloudinary");
const Notification = require("../models/NotificationModel");
const sendRecoveryCode = require("../utils/SendRecoveryCode.js");

// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Create User ------------------");
    const {
      rotarianId,
      name,
      contactNumber,
      email,
      clubName,
      clubId,
      designation,
      password,
      avatar,
    } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    let myCloud;

    if (avatar) {
      myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
    }


    user = await User.create({
      rotarianId,
      contactNumber,
      name,
      clubName,
      clubId,
      designation,
      email,
      password,
      avatar: avatar
        ? { public_id: myCloud.public_id, url: myCloud.secure_url }
        : null,
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log("----------------Logging in User-------------------------");
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter the email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }

  sendToken(user, 201, res);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

exports.sendRecoveryCode = catchAsyncErrors(async (req, res, next) => {
  console.log("----------------Send Recovery Code-------------------------");
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return next(new ErrorHandler("Please enter the email", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User is not found with this email", 401));
  }
  console.log("User found");
  await sendRecoveryCode(email);
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  console.log("----------------Update Password-------------------------");
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter the email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User is not found with this email", 401));
  }
  console.log("User founf");
  SendRecoveryCode(email);
});
//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  console.log("--------Get My Profile------------");
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete User ------------------");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    if (user.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    await User.deleteOne({
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

// Add user as regional leader
exports.addRegionalLeader = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "--------------Assining User as regional leader------------------"
    );
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isRegionalLeader: true,
        },
      }
    );
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

// Get all regional leaders
exports.getAllRegionalLeaders = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "----------------Fetching Regional Leaders-------------------------"
    );

    const regionalLeaders = await User.find({ isRegionalLeader: true });
    res.status(201).json({
      success: true,
      regionalLeaders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete regional leader
exports.deleteRegionalLeader = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete regional leader------------------");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isRegionalLeader: false,
        },
      }
    );
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

// Adding user as district governer
exports.addDistrictGoverner = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "--------------Assining User as district governer------------------"
    );
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isDistrictGoverner: true,
        },
      }
    );
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

// Get all district governer
exports.getAllDistrictGoverner = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "----------------Fetching district governer-------------------------"
    );

    const districtGoverner = await User.find({ isDistrictGoverner: true });
    res.status(201).json({
      success: true,
      districtGoverner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete district governer
exports.deleteDistrictGoverner = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete district governer------------------");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isDistrictGoverner: false,
        },
      }
    );
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

// Adding user as Indian leader
exports.addIndianLeader = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "--------------Assining User as Indian leader------------------"
    );
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isIndiaLeader: true,
        },
      }
    );
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

// Get all Indian leaders
exports.getAllIndianLeader = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(
      "----------------Fetching Indian leaders-------------------------"
    );

    const indianLeader = await User.find({ isIndiaLeader: true });
    res.status(201).json({
      success: true,
      indianLeader,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete Indian leaders
exports.deleteIndianLeader = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Delete Indian leader------------------");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isIndiaLeader: false,
        },
      }
    );
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

// Add user as admin
exports.addAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("--------------Adding admin------------------");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          role: "admin",
        },
      }
    );
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

// get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const loggedInuser = req.user.id;
  const users = await User.find({ _id: { $ne: loggedInuser } }).sort({
    createdAt: -1,
  });

  res.status(201).json({
    success: true,
    users,
  });
});

// Follow and unfollow user
exports.followUnfollowUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("-------------Follow Unfollow----------------");
    const loggedInUser = req.user;
    const { followUserId } = req.body;

    const isFollowedBefore = loggedInUser.following.find(
      (item) => item.userId === followUserId
    );
    const loggedInUserId = loggedInUser._id;

    if (isFollowedBefore) {
      await User.updateOne(
        { _id: followUserId },
        { $pull: { followers: { userId: loggedInUserId } } }
      );

      await User.updateOne(
        { _id: loggedInUserId },
        { $pull: { following: { userId: followUserId } } }
      );

      await Notification.deleteOne({
        "creator._id": loggedInUserId,
        userId: followUserId,
        type: "Follow",
      });

      res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    } else {
      await User.updateOne(
        { _id: followUserId },
        { $push: { followers: { userId: loggedInUserId } } }
      );

      await User.updateOne(
        { _id: loggedInUserId },
        { $push: { following: { userId: followUserId } } }
      );

      await Notification.create({
        creator: req.user,
        type: "Follow",
        title: "Followed you",
        userId: followUserId,
      });

      res.status(200).json({
        success: true,
        message: "User followed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401));
  }
});

// get user notification
exports.getNotification = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("-------------GetNotification----------------");
    const notifications = await Notification.find({ userId: req.user.id }).sort(
      { createdAt: -1 }
    );

    res.status(201).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401));
  }
});

// get signle user
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("-------------Get User----------------");
    const user = await User.findById(req.params.id);

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401));
  }
});

// update user avatar
exports.updateUserAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("-------------Update User Avatar----------------");
    let existsUser = await User.findById(req.user.id);
    let myCloud;
    if (req.body.avatar !== "") {
      const imageId = existsUser.avatar.public_id;
      if (imageId != null) {
        await cloudinary.v2.uploader.destroy(imageId);

        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });
      } else {
        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });
      }
      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    await existsUser.save();

    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401));
  }
});

// update user info
exports.updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("-------------Update UserInfo----------------");
    const user = await User.findById(req.user.id);

    user.name = req.body.name;
    user.userName = req.body.userName;
    user.bio = req.body.bio;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401));
  }
});
