const express = require("express");
const { createDesignation, getAllDesignation, deleteDesignation } = require("../controllers/designation");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createDesignation").post(createDesignation);

router.route("/getAllDesignation").get(getAllDesignation);

router.route("/deleteDesignation/:id").delete(deleteDesignation);


module.exports = router;
