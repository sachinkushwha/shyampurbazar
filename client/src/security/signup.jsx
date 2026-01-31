import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export const Signup = () => {
    const {role}=useParams();
    const navigate = useNavigate();
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:role
    });

    const handleonchange = (e) => {
        const { name, value } = e.target;
        setFormData((pre) => ({
            ...pre,
            [name]: value
        }));
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(FormData);
        try{
        const res = await axios.post('http://localhost:3000/signup', FormData, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.data.status) {
            alert("user registration successful");
            navigate(`/login/${role}`);
        }}catch(error){
            if(error.response.status===409){
                alert(error.response.data.message);
            }else{
                alert("Network error");
            }
        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handlesubmit}
                    className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        Create Account
                    </h2>

                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Enter Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={FormData.name}
                        onChange={handleonchange}
                        autoFocus
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Enter Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={FormData.email}
                        onChange={handleonchange}
                        placeholder="example@gmail.com"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Set Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={FormData.password}
                        onChange={handleonchange}
                        placeholder="123abc@$&*"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                    <p className="mt-5">if already have account <Link to="/login" className="text-blue-500 cursor-pointer">login</Link></p>
                </form>

            </div>
        </>
    );
};
