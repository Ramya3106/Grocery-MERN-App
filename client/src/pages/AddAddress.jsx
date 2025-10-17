import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [savedAddress, setSavedAddress] = React.useState(null);
  const { navigate, user, axios, fetchUserAddresses } = useContext(AppContext);
  
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Load addresses from backend
  const loadAddresses = async () => {
    try {
      if (!user) {
        // For non-authenticated users, try localStorage
        const saved = localStorage.getItem('userAddress');
        if (saved) {
          setSavedAddress(JSON.parse(saved));
        }
        return;
      }
      
      const { data } = await axios.get("/api/address/get");
      if (data.success && data.addresses.length > 0) {
        // Use the most recent address
        const latestAddress = data.addresses[data.addresses.length - 1];
        setSavedAddress(latestAddress);
        // Also save to localStorage as backup
        localStorage.setItem('userAddress', JSON.stringify(latestAddress));
      } else {
        // Fallback to localStorage if no addresses in database
        const saved = localStorage.getItem('userAddress');
        if (saved) {
          setSavedAddress(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      // Fallback to localStorage on error
      const saved = localStorage.getItem('userAddress');
      if (saved) {
        setSavedAddress(JSON.parse(saved));
      }
    }
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
      
      // Check if user is authenticated
      if (!user) {
        toast.error("Please login to save address");
        return;
      }
      
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
      const missingFields = requiredFields.filter(field => !address[field]);
      
      if (missingFields.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      // Save address to MongoDB via API
      const { data } = await axios.post("/api/address/add", { address });
      
      if (data.success) {
        setSavedAddress(address);
        // Also save to localStorage as backup
        localStorage.setItem('userAddress', JSON.stringify(address));
        toast.success(data.message || "Address saved successfully!");
        console.log("Saved Address:", address);
        
        // Refresh addresses in context
        if (fetchUserAddresses) {
          fetchUserAddresses();
        }
        
        // Navigate back to cart after saving
        setTimeout(() => {
          navigate("/cart");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Address save error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Please login to save address");
        } else {
          toast.error(error.response.data?.message || `Error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error("Network error. Please check if the backend server is running.");
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [user]);
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Left Side: Address Fields */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Address Details
        </h2>
        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Zip Code</label>
            <input
              type="number"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Phone</label>
            <input
              type="number"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>

        {/* Display Saved Address */}
        {savedAddress && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Saved Address:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Name:</strong> {savedAddress.firstName} {savedAddress.lastName}</p>
              <p><strong>Email:</strong> {savedAddress.email}</p>
              <p><strong>Street:</strong> {savedAddress.street}</p>
              <p><strong>City:</strong> {savedAddress.city}, {savedAddress.state} {savedAddress.zipCode}</p>
              <p><strong>Country:</strong> {savedAddress.country}</p>
              <p><strong>Phone:</strong> {savedAddress.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AddAddress;