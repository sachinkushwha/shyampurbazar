import React, { useState } from "react";
import { User, Mail, Lock, UserPlus, Github, Chrome, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik'
import axios from "axios";
import { BASE_URL } from "../config/ServerUrlConfig";
import { useMutation } from "@tanstack/react-query";

const SignupPage = () => {

    const navigate = useNavigate();
    const createDeliveryPartnerAccount = async (formData) => {
        const response = await axios.post(`${BASE_URL}/deliverypartner/signup`, formData, {
            withCredentials: true
        });
        return response.data;
    }
    const DeliveryPartnerAccountMutation = useMutation({
        mutationFn: createDeliveryPartnerAccount,
        onSuccess: (data) => {
            alert(data.message);
            navigate('/login')
        }
    })

    const handleSubmit = (formData) => {
        DeliveryPartnerAccountMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative">
            {/* Mesh Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[420px]">
                <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                            <UserPlus className="text-white w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Create Account
                        </h2>
                        <p className="text-zinc-500 mt-2 text-sm">Join our premium community today</p>
                    </div>

                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            number: "",
                            password: "",
                        }}
                        onSubmit={(formData, { resetForm }) => {
                            handleSubmit(formData);
                            resetForm();
                        }}
                        className="space-y-5">
                        <Form>
                            {/* Full Name */}
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative group mt-3">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                                    required
                                />
                            </div>
                            <div className="relative group mt-3">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Field
                                    type="text"
                                    name="number"
                                    placeholder="Mobile Number"
                                    maxLength={10}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative group mt-3">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all duration-300 shadow-xl active:scale-[0.97] mt-2 mt-3"
                            >
                                Get Started
                            </button>
                        </Form>
                    </Formik>

                    {/* Divider */}
                    {/* <div className="flex items-center my-8 text-zinc-700">
            <div className="flex-1 border-t border-zinc-800"></div>
            <span className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold">Or sign up with</span>
            <div className="flex-1 border-t border-zinc-800"></div>
          </div> */}

                    {/* Social Icons */}
                    {/* <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">
              <Chrome className="w-5 h-5 text-white" />
            </button>
            <button className="flex items-center justify-center py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">
              <Github className="w-5 h-5 text-white" />
            </button>
          </div> */}

                    <p className="text-center text-zinc-500 text-sm mt-8">
                        Already have an account?{" "}
                        <Link to='/login' className="text-blue-500 font-semibold hover:text-blue-400 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;