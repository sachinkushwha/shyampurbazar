import { useContext } from "react";
import { useParams } from "react-router-dom";
import { OrderDataContext } from "../Context Api/orderDataManagement";
import {
  Package,
  User as UserIcon,
  MapPin,
  CreditCard,
  Calendar,
  CheckCircle,
  DollarSign,
  Hash,
  Clipboard,
  Copy
} from "lucide-react";
import axios from "axios";
import { userContext } from "../Context Api/userManagment";
import { useQuery } from "@tanstack/react-query";

export const ViewOrder = () => {
  const { id } = useParams();
  const { User } = useContext(userContext);

  const fetchallOrderdata = async () => {
    const response = await axios.get('http://localhost:3000/protected/order', {
      headers: { 'authorization': User.token }
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['orderdata'],
    queryFn: fetchallOrderdata
  });

  const order = data?.orderdata?.find(od => id === od._id);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Order Not Found</h2>
          <p className="text-gray-500">The requested order could not be located.</p>
        </div>
      </div>
    );
  }

  const statusColors = {
    "pending": "bg-yellow-100 text-yellow-800",
    "processing": "bg-blue-100 text-blue-800",
    "shipped": "bg-purple-100 text-purple-800",
    "delivered": "bg-green-100 text-green-800",
    "cancelled": "bg-red-100 text-red-800"
  };

  const paymentColors = {
    "credit card": "bg-blue-50 text-blue-700 border-blue-200",
    "debit card": "bg-purple-50 text-purple-700 border-purple-200",
    "paypal": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "cash": "bg-green-50 text-green-700 border-green-200",
    "upi": "bg-indigo-50 text-indigo-700 border-indigo-200"
  };

  // Function to truncate long order ID
  const truncateOrderId = (id) => {
    if (id.length > 16) {
      return `${id.substring(0, 8)}...${id.substring(id.length - 8)}`;
    }
    return id;
  };

  // Function to copy order ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(order._id);
    alert("Order ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <div className="flex items-center gap-2 mt-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-sm sm:text-base">
                  {(order._id)}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy Order ID"
                >
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-full font-semibold text-sm ${statusColors[order.orderstatus?.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
                {order.orderstatus?.toUpperCase()}
              </div>
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.item?.map((itm, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-indigo-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{itm.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {itm.qty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">${itm.price}</p>
                      <p className="text-sm text-gray-500">${(itm.price * itm.qty).toFixed(2)} total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                    <p className="font-medium text-gray-900">{order.username}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                    <p className="font-medium text-gray-900 break-words">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Hash className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">Order ID</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-gray-100 px-3 py-1.5 rounded break-all min-w-0">
                      {truncateOrderId(order._id)}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors shrink-0"
                      title="Copy Order ID"
                    >
                      <Clipboard className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Order Date</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {new Date(order.orderdate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Order Status</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${statusColors[order.orderstatus?.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
                    {order.orderstatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>Payment Method</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ${paymentColors[order.paymentmode?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                    {order.paymentmode}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        ${order.totalPayment}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-700 font-medium">Payment Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                {/* <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                  Track Order
                </button> */}
                {/* <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                  Download Invoice
                </button> */}
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-indigo-100 mb-4">Our support team is here to help</p>
              <button className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};