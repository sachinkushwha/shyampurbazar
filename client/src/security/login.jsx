import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { userContext } from "../Context Api/userManagment";
import { useContext } from "react";
import { BASE_URL } from "../components/config";


export const Login = () => {
  const { role } = useParams();
  const { logingUser } = useContext(userContext);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: ""
  })
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setformdata(prv => ({
      ...prv,
      [name]: value
    }));
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, formdata, {
        headers: { "Content-Type": "application/json" }
      });

      if (res?.data?.status) {
        logingUser(res.data);
        alert('login successful');
        if (res?.data?.role === 'seller') {
          navigate('/owner');
        } else {
          navigate('/');
        }

      }


    } catch (error) {
      if (error.message.includes("ERR_CONNECTION_REFUSED")) {
        alert("⚠️ Server se connection nahi ho raha. Backend ko check karein.");
      } else {
        alert("Somthing is worng: " + error.message);
      }
      if (error.response.status === 404) {
        alert(error.response.data.message)
      } else if (error.response.status === 401) {
        alert(error.response.data.message)
      }

    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handlesubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h2>

        <div>
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            onChange={handleonchange}
            autoFocus
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handleonchange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p>if you don't have account <span className="text-blue-500 cursor-pointer"><Link to={`/signup/${role}`}>Signup</Link></span></p>
      </form>
    </div>
  );
};
