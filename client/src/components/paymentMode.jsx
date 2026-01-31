import { useContext, useState } from "react";
import { userContext } from "../Context Api/userManagment";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const PaymentMethod = () => {
  const { User } = useContext(userContext);
  const [paymentmode, setpaymentmode] = useState();
  const navigate = useNavigate();

  const handlsubmit =async (e) => {
    e.preventDefault();
    if (paymentmode) {
      console.log("cash on delivery");
      const item = JSON.parse(localStorage.getItem(User?.username + "orderpepsicart"));
      item.paymentmode = paymentmode;
      const response=await axios.post('http://localhost:3000/protected/order',item,{
        headers:{"authorization":User?.token}
      })
      if(response.data.status){
        console.log("order ka response data",response.data);
      }
      localStorage.removeItem(User?.username + "orderpepsicart");
      localStorage.removeItem(User?.username + "pepsicart");
      alert("Congratulations! Your order has been submitted 🎉");
      navigate("/orderhistory");
    } else {
      alert("Please select a payment mode");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <form
        onSubmit={handlsubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Select Payment Method
        </h2>

        <div className="space-y-4 mb-6">
          <label
            htmlFor="CashOnDelivery"
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
          >
            <input
              type="radio"
              id="CashOnDelivery"
              name="payment"
              value="Cash On Delivery"
              onChange={(e) => setpaymentmode(e.target.value)}
              className="accent-blue-600"
            />
            <span className="text-gray-700 font-medium">Cash On Delivery</span>
          </label>

          <label
            htmlFor="online"
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
          >
            <input type="radio" id="online" name="payment" disabled />
            <span>Online Payment (coming soon)</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Order Now
        </button>
      </form>
    </section>
  );
};
