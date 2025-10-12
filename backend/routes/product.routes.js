import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

router.post('/add-product',upload.array("images"));

export default router;