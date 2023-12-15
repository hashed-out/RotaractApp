const express = require("express");
const {  } = require("../controllers/post");
const { isAuthenticatedUser } = require("../middleware/auth");
const { registerForEvent, getAllRegistered } = require("../controllers/eventRegistration");
const { getAllRegionalLeaders } = require("../controllers/user");
const router = express.Router();

router.route("/registerForEvent").post(isAuthenticatedUser,registerForEvent);

router.route("/getAllRegistered/:id").get(isAuthenticatedUser,getAllRegistered);

module.exports = router;
