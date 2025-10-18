import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SellerLogin from "./SellerLogin";

const SellerAuthGuard = ({ children }) => {
  const { isSeller, checkSellerAuth } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        await checkSellerAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setAuthChecked(true);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [checkSellerAuth]);

  // Show loading while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  // Show login page if not authenticated, otherwise show the children (seller routes)
  return isSeller ? children : <SellerLogin />;
};

export default SellerAuthGuard;