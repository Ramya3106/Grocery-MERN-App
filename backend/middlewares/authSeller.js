import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authSeller;