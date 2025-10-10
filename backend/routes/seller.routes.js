import express from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import authSeller from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", authUser, checkAuth);
router.get("/logout", authUser, logout);

export default router;