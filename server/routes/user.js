const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  userDetails,
  getAllUsers,
  followUnfollowUser,
  getNotification,
  getUser,
  updateUserAvatar,
  updateUserInfo,
  sendRecoveryCode,
  updatePassword,
  deleteUser,
  addRegionalLeader,
  getAllRegionalLeaders,
  addAdmin,
  deleteRegionalLeader,
  addDistrictGoverner,
  getAllDistrictGoverner,
  deleteDistrictGoverner,
  addIndianLeader,
  getAllIndianLeader,
  deleteIndianLeader,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(createUser);

router.route("/login").post(loginUser);

router.route("/sendRecoveryCode").post(sendRecoveryCode);

router.route("/updatePassword").post(updatePassword);

router.route("/logout").get(logoutUser);

router.route("/users").get(isAuthenticatedUser, getAllUsers);

router.route("/add-user").put(isAuthenticatedUser, followUnfollowUser);

router.route("/get-notifications").get(isAuthenticatedUser, getNotification);

router.route("/get-user/:id").get(isAuthenticatedUser, getUser);

router.route("/update-avatar").put(isAuthenticatedUser, updateUserAvatar);

router.route("/update-profile").put(isAuthenticatedUser, updateUserInfo);

router.route("/me").get(isAuthenticatedUser, userDetails);

router.route("/deleteUser/:id").delete(isAuthenticatedUser, deleteUser);

router.route("/addRegionalLeader/:id").put(isAuthenticatedUser, addRegionalLeader);

router.route("/getAllRegionalLeaders").get(isAuthenticatedUser, getAllRegionalLeaders);

router.route("/deleteRegionalLeader/:id").put(isAuthenticatedUser, deleteRegionalLeader);

router.route("/addDistrictGoverner/:id").put(isAuthenticatedUser, addDistrictGoverner);

router.route("/getAllDistrictGoverners").get(isAuthenticatedUser, getAllDistrictGoverner);

router.route("/deleteDistrictGoverner/:id").put(isAuthenticatedUser, deleteDistrictGoverner);

router.route("/addIndianLeader/:id").put(isAuthenticatedUser, addIndianLeader);

router.route("/getAllIndianLeaders").get(isAuthenticatedUser, getAllIndianLeader);

router.route("/deleteIndianLeader/:id").put(isAuthenticatedUser, deleteIndianLeader);

router.route("/addAdmin/:id").put(isAuthenticatedUser, addAdmin);

module.exports = router;
