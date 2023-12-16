const express = require("express");
const { createDesignation, getAllDesignation, deleteDesignation } = require("../controllers/designation");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createDesignation").post(isAuthenticatedUser,createDesignation);

router.route("/getAllDesignation").get(getAllDesignation);

router.route("/deleteDesignation/:id").delete(isAuthenticatedUser,deleteDesignation);


module.exports = router;
