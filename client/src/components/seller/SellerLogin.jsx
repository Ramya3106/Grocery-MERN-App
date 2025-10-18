import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);
  const [email, setEmail] = useState("admin@gmail.com"); // Default email
  const [password, setPassword] = useState("admin123"); // Default password
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      
      if (data.success) {
        setIsSeller(true);
        toast.success("Login successful!");
        // Navigate to seller dashboard after successful login
        navigate("/seller");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || `Error: ${error.response.status}`);
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check if the backend server is running.");
      } else {
        // Other error
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center  bg-black/50 text-gray-600">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span>
            Login
          </p>
          
          <div className="text-sm text-gray-500 text-center w-full">
            <p>Demo Credentials:</p>
            <p>Email: admin@gmail.com</p>
            <p>Password: admin123</p>
          </div>

          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="password"
              required
            />
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </form>
      </div>
  );
};
export default SellerLogin;

