import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        message: "Access denied. No token provided.", 
        success: false 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ 
        message: "Access denied. User not found.", 
        success: false 
      });
    }

    req.user = user._id;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ 
      message: "Access denied. Invalid token.", 
      success: false 
    });
  }
};

export default authUser;