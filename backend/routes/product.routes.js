import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { upload } from "../config/multer.js"
const router = express.Router();

router.post('/add-product',upload.array("images"));

export default router;