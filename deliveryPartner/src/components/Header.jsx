import React, { useState } from "react";
import { Menu, X, LayoutDashboard, LogIn,LogOut, UserPlus, Home, Smartphone } from "lucide-react";
import { userAuth } from "../Hooks/userAuth";
import axios from "axios";
import { BASE_URL } from "../config/ServerUrlConfig";
import { useMutation } from "@tanstack/react-query";
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { data } = userAuth();
console.log('user',data)
    const postHandlelogout=async()=>{
        const response=await axios.post(`${BASE_URL}/deliverypartner/logout`,{},{
            withCredentials:true
        });
        return response.data;
    }

    const LogoutMutation=useMutation({
        mutationFn:postHandlelogout,
        onSuccess:(data)=>{
            alert(data.message);
            navigate('/login')
        }
    })
    const handleLogout=()=>{
        LogoutMutation.mutate();
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 py-4 px-5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* LOGO: Mobile pe bhi dikhega */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        My<span className="text-blue-500">App</span>
                    </h2>
                </div>

                {/* DESKTOP LINKS: Hidden on Mobile */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home</a>
                    <button onClick={handleLogout} className="text-red-400 hover:text-white transition-colors text-sm font-medium">LogOut</button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all">
                        {data?.name}
                    </button>
                </div>

                {/* MOBILE ACTIONS: Logo ke sath sirf ek button aur menu */}
                <div className="flex md:hidden items-center gap-3">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-blue-600/30">
                        {data?.name}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white p-2 bg-white/5 rounded-xl border border-white/10"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* MOBILE DRAWER: Side se ya Top se aane wala menu */}
            <div className={`absolute top-full left-0 right-40  bg-[#0f172a] border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} md:hidden`}>
                <div className="p-6 space-y-4 flex flex-col">
                    <MobileNavLink href="/" icon={<Home size={18} />} label="Dashboard" onClick={() => setIsOpen(false)} />
                    {data ? (
                        <MobileNavLink href="#"  icon={<LogOut size={18} />} label="LogOut" onClick={() => setIsOpen(false)} />
                    ) : (
                        <MobileNavLink href="/login" icon={<LogIn size={18} />} label="Login" onClick={() => setIsOpen(false)} />
                    )}
                    {!data && <MobileNavLink href="/signup" icon={<UserPlus size={18} />} label="Create Account" onClick={() => setIsOpen(false)} />}

                    {/* <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">Quick Actions</p>
            <button className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <Smartphone size={18} />
              Download App
            </button>
          </div> */}
                </div>
            </div>
        </nav>
    );
};

// Sub-component for Mobile Links
const MobileNavLink = ({ href, label, icon, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className="flex items-center gap-4 text-slate-300 hover:text-white p-3 hover:bg-white/5 rounded-xl transition-all"
    >
        <span className="text-blue-500">{icon}</span>
        <span className="font-medium">{label}</span>
    </a>
);

export default Navbar;