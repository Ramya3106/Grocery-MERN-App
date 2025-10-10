import express from "express";
import { sellerLogin,sellerLogout } from "../controllers/user.controller.js";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", authSeller, checkAuth);
router.get("/logout", authSeller, logout);

export default router;