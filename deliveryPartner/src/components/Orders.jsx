import React, { useState } from "react";
import {
    Navigation,
    IndianRupee,
    PackageCheck,
    Zap,
    MoreVertical,
    MapPin,
    Package,
    CheckCircle2,
    Clock,
    TrendingUp
} from "lucide-react";
import axios from 'axios'
import { BASE_URL } from "../config/ServerUrlConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userAuth } from "../Hooks/userAuth";
import { Link } from "react-router-dom";

const OrdersList = () => {

    const { data: user } = userAuth();

    // get deliverypartner accepted orders
    const getAcceptedOrders = async () => {
        const response = await axios.get(`${BASE_URL}/deliverypartner/accepted-orders`,{
            withCredentials:true
        });
        return response.data;
    }

    const { data: acceptedOrders } = useQuery({
        queryKey: ['acceptedOrders'],
        queryFn: getAcceptedOrders
    });
    console.log('accepted oreder', acceptedOrders);
    // update order status

    const acceptOrder = async (data) => {
        const response = await axios.post(`${BASE_URL}/protected/updatestatus`, data, {
            withCredentials: true
        });
        return response.data;
    }
    const acceptOrderMutation = useMutation({
        mutationFn: acceptOrder,
        onSuccess: (data) => {
            alert(data.message);
        }
    })
    const updateStatus = (orderId, newStatus, dpid) => {
        acceptOrderMutation.mutate({ orderId, newStatus, dpid });
    }

    // get all searching state products
    const getOrder = async () => {
        const response = await axios.get(`${BASE_URL}/protected/deliverypartnerorder`, {
            withCredentials: true
        });
        return response.data;
    }

    const { data } = useQuery({
        queryKey: ['deliveryPartnerorderdata'],
        queryFn: getOrder
    })

    console.log(data)

    const stats = [
        {
            title: "New Orders",
            value: data?.orderData.length,
            icon: <Package className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-400",
            shadow: "shadow-blue-500/20",
            trend: "+12% vs yesterday",
            link:'#'
        },
        {
            title: "Completed",
            value: acceptedOrders?.acceptedOrder?.filter(item=>item.orderstatus==='completed').length,
            icon: <CheckCircle2 className="w-6 h-6" />,
            color: "from-emerald-500 to-teal-400",
            shadow: "shadow-emerald-500/20",
            trend: "85% success rate",
            link:`accepted-orders/${'completed'}`
        },
        {
            title: "Accepted Orders",
            value: acceptedOrders?.acceptedOrder?.filter(order=>order.orderstatus==='picked').length,
            icon: <Clock className="w-6 h-6" />,
            color: "from-orange-500 to-amber-400",
            shadow: "shadow-orange-500/20",
            trend: "Requires attention",
            link:`/accepted-orders/${'picked'}`
        },

        {
            title: "Today Earnings",
            value: acceptedOrders?.acceptedOrder?.filter(item=>item.orderstatus==='completed')?.reduce((sum,order)=>sum+order.totalPayment*0.08,0),
            icon: <IndianRupee className="w-6 h-6" />,
            color: "from-indigo-600 to-purple-500",
            shadow: "shadow-indigo-500/20",
            trend: "+5.4% growth",
            link:'#'
        }
    ];

    return (
        <>
            <div className="grid grid-cols-2 mt-15 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-[#f8fafc]">
                {stats.map((item, index) => (
                    <Link to={item.link}
                        key={index}
                        className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        {/* Top Row: Icon & Trend */}
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Live
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                            <h3 className="text-slate-500 text-sm font-medium tracking-wide">
                                {item.title}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-slate-800 tracking-tight">
                                    {item.value || 0}
                                </span>
                            </div>
                        </div>


                        {/* Decorative background element */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                    </Link>
                ))}
            </div>
            <div className="max-w-xl mx-auto p-4 space-y-5 bg-[#f8fafc] min-h-screen font-sans">
                <div className="flex justify-between items-end px-2 mb-2">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Orders</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Assignments</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black border border-indigo-100 uppercase">
                        {data?.orderData?.length} Jobs
                    </div>
                </div>

                {data?.orderData?.map((order) => (
                    <div key={order._id} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[11px] font-black text-slate-400 tracking-tighter uppercase">ID: {order?._id}</span>
                            </div>
                            <div className="flex items-center text-emerald-600 font-black text-xl">
                                <IndianRupee size={18} strokeWidth={3} />
                                {order?.totalPayment}
                            </div>
                        </div>

                        {/* ADDRESS ROW: Optimized for Long Text */}
                        <div className="flex items-start justify-between gap-6 mb-8">
                            {/* Pickup */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center">
                                        <MapPin size={10} className="text-indigo-600" />
                                    </div>
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Pickup</p>
                                </div>
                                <h4 className="text-[13px] font-bold text-slate-700 leading-snug line-clamp-3 min-h-[40px]">
                                    {order?.pickup}
                                </h4>
                            </div>

                            {/* Visual Divider (Center) */}
                            <div className="flex flex-col items-center justify-center pt-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                <div className="w-[1px] h-4 border-l border-dashed border-slate-300 my-1"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                            </div>

                            {/* Delivery */}
                            <div className="flex-1 min-w-0 text-right">
                                <div className="flex items-center justify-end gap-1.5 mb-2">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Delivery</p>
                                    <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center">
                                        <Navigation size={10} className="text-emerald-600" />
                                    </div>
                                </div>
                                <h4 className="  text-slate-700  ">
                                    <div className="text-sm text-gray-500 ">
                                        {order.address.split(',').map((part, index) => (
                                            <div key={index} className="break-words">{part.trim()},</div>
                                        ))}
                                    </div>
                                </h4>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-3">
                            {order?.orderstatus === "searching" && (
                                <button
                                    onClick={() => updateStatus(order?._id, "Picked", user.id)}
                                    className="flex-[4] bg-indigo-600 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-all text-sm tracking-tight"
                                >
                                    <Zap size={16} fill="white" />
                                    Accept Order
                                </button>
                            )}

                            {order?.orderstatus === "Picked" && (
                                <button
                                    onClick={() => updateStatus(order?.id, "Delivered")}
                                    className="flex-[4] bg-blue-600 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all text-sm tracking-tight"
                                >
                                    <Navigation size={16} className="rotate-45 fill-white" />
                                    Start Trip
                                </button>
                            )}

                            {order?.status === "Delivered" && (
                                <div className="flex-[4] bg-emerald-50 text-emerald-600 font-bold py-4 rounded-[1.5rem] border border-emerald-100 flex items-center justify-center gap-2 text-sm">
                                    <PackageCheck size={18} />
                                    Completed
                                </div>
                            )}

                            {/* KM Badge */}
                            {/* <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-3 flex flex-col items-center justify-center min-w-[60px]">
                            <span className="text-xs font-black text-slate-700">{order.distance}</span>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">KM</span>
                        </div>

                        <button className="w-12 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                            <MoreVertical size={20} />
                        </button> */}
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
};

export default OrdersList;