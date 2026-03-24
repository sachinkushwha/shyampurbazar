import axios from "axios";
import { Mail, Lock, ArrowRight, Github } from "lucide-react"; // Icons for premium feel
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { BASE_URL } from "../config/ServerUrlConfig";
import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
    const navigate=useNavigate();
   
    const LoginDeliveryPartner=async(formData)=>{
        console.log(formData)
        const response=await axios.post(`${BASE_URL}/deliverypartner/login`,formData,{
            withCredentials:true
        });
        return response.data;
    }
    const LoginDeliveryPartnerMutaion=useMutation({
        mutationFn:LoginDeliveryPartner,
        onSuccess:(data)=>{
            alert(data.message);
            navigate('/')
        }
    })
    const handleSubmit = (formData) => {
        LoginDeliveryPartnerMutaion.mutate(formData)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-indigo-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-slate-400 text-sm">Please enter your details to sign in.</p>
                </div>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(formData, { resetForm }) => {
                        handleSubmit(formData);
                        resetForm();
                    }}
                    className="space-y-6">
                    <Form>
                        {/* Email Field */}
                        <div className="space-y-2 mt-6">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 mt-6">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                {/* <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a> */}
                            </div>
                            <div className="relative group ">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-5 group relative flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 active:scale-[0.98]"
                        >
                            Sign In
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Form>
                </Formik>

                {/* Divider */}
                {/* <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-slate-700"></div>
                    <span className="px-4 text-slate-500 text-xs uppercase tracking-widest">Or continue with</span>
                    <div className="flex-1 border-t border-slate-700"></div>
                </div> */}

                {/* Social Login (Optional Premium Touch) */}
                {/* <button className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl border border-slate-700 transition-colors mb-6">
                    <Github className="h-5 w-5" />
                    <span>Github</span>
                </button> */}

                <p className="text-center text-slate-400 text-sm mt-3">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-indigo-400 font-semibold hover:underline decoration-2 underline-offset-4">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;