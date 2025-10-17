import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/connectDB.js";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

import { connectCloudinary } from "./config/cloudinary.js";

const app = express();
connectDB();
connectCloudinary();
// allow multiple origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];
//middlewares
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Hello World");
})

// Test API endpoint
app.get("/api/test", (req,res) =>{
    res.json({ message: "API is working!", success: true });
});

// Serve test HTML file
app.get("/test-register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "test-register.html"));
});

// Serve seller login test file
app.get("/test-seller-login", (req, res) => {
    res.sendFile(path.join(process.cwd(), "test-seller-login.html"));
});

// Serve add product test file
app.get("/test-add-product", (req, res) => {
    res.sendFile(path.join(process.cwd(), "test-add-product.html"));
});

// Serve user auth test file
app.get("/test-user-auth", (req, res) => {
    res.sendFile(path.join(process.cwd(), "test-user-auth.html"));
});

// Api endpoints
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});