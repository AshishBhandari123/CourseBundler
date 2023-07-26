import express, { Router } from "express";
import {
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// to register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// change password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// Forget Password
router.route("/forgetpassword").post(forgetPassword);

// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);
export default router;
