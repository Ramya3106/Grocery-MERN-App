import express from "express";
import { isAuthSeller,sellerLogin,sellerLogout } from "../controllers/user.controller.js";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

export default router;