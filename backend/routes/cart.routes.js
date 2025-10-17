import express from "express";
import { updateCart, getCart } from "../controllers/cart.controller.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();
router.post("/update", authUser, updateCart);
router.get("/get", authUser, getCart);
export default router;