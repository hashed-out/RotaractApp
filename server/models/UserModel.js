const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    rotarianId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    contactNumber: {
      type: String,
      required: false,
    },
    clubName: {
      type: String,
    },
    clubId: {
      type: String,
    },
    designation: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    followers: [
      {
        userId: {
          type: String,
        },
      },
    ],
    following: [
      {
        userId: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    isRegionalLeader: {
      type: Boolean,
      default: false,
    },
    isDistrictGoverner: {
      type: Boolean,
      default: false,
    },
    isIndiaLeader: {
      type: Boolean,
      default: false,
    },
    recoveryCode: {
      type: String,
      default: "",
      required: false,
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
