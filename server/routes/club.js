const express = require("express");
const { createClub, getAllClubs, deleteClub } = require("../controllers/club");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createClub").post(isAuthenticatedUser,createClub);

router.route("/getAllClubs").get(isAuthenticatedUser,getAllClubs);

router.route("/deleteClub/:id").delete(isAuthenticatedUser,deleteClub);


module.exports = router;
