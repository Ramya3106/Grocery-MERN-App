import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { axios } = useContext(AppContext);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        // Remove duplicate orders by filtering unique order IDs
        const uniqueOrders = data.orders.filter((order, index, self) => 
          index === self.findIndex(o => o._id === order._id)
        );
        setOrders(uniqueOrders);
        toast.success(`${uniqueOrders.length} orders loaded successfully`);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        toast.error("Please login as seller to view orders");
      } else {
        toast.error("Failed to fetch orders");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-10 p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Orders List</h2>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
        >
          Refresh Orders
        </button>
      </div>
      
      {orders.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px] border border-gray-200 rounded-lg bg-white">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">No orders found</p>
            <p className="text-gray-400 text-sm">Orders will appear here when customers place them</p>
          </div>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col lg:grid lg:grid-cols-[4fr_2fr_1fr_1.5fr] gap-6 p-6 max-w-7xl rounded-lg border border-gray-300 text-gray-800 shadow-sm bg-white"
          >
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Order Items:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <img
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    src={item.product.image?.[0] || boxIcon}
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = boxIcon;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        ${item.product.offerPrice || item.product.price}
                      </span>
                      {item.quantity > 1 && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                          × {item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm space-y-2">
            <h4 className="font-semibold text-gray-800">Delivery Address:</h4>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              <p className="font-medium text-gray-900">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {order.address.street}, {order.address.city}
              </p>
              <p className="text-gray-600">
                {order.address.state}, {order.address.zipcode}
              </p>
              <p className="text-gray-600 font-medium">
                {order.address.country}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-lg text-green-600">
              ${order.amount}
            </p>
          </div>

          <div className="flex flex-col text-sm space-y-1">
            <p className="text-gray-700">
              <span className="font-medium">Method:</span> {order.paymentType}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Payment:</span> 
              <span className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold ${
                order.isPaid 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Orders;
if{

}