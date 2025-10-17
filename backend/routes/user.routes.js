import express from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", authUser, checkAuth);
router.get("/logout", authUser, logout);
router.get("/all", getAllUsers); // Debug endpoint

export default router;