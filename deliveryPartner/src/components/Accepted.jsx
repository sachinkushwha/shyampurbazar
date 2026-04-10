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
    TrendingUp,
    User
} from "lucide-react";
import axios from 'axios'
import { BASE_URL } from "../config/ServerUrlConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAuth } from "../Hooks/userAuth";
import { useParams } from "react-router-dom";



const AcceptedOrderList = () => {
    const { data: user } = userAuth();
    const {start}=useParams();
    const queryClient=useQueryClient();
    console.log(start);
    // get deliverypartner accepted orders
    const getAcceptedOrders = async () => {
        const response = await axios.get(`${BASE_URL}/deliverypartner/accepted-orders`, {
            withCredentials: true
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
            queryClient.invalidateQueries(['acceptedOrders'])
        }
    })
    const updateStatus = (orderId, newStatus, dpid) => {
        acceptOrderMutation.mutate({ orderId, newStatus, dpid });
    }



    // console.log('accepted page', acceptedOrders);
    const OrderData=acceptedOrders?.acceptedOrder?.filter(f=>f.orderstatus===start);
    console.log('picked',OrderData);



    return (
        <>
            <div className="max-w-xl mx-auto p-4 space-y-5 bg-[#f8fafc] min-h-screen font-sans mt-30">
                <div className="flex justify-between items-end px-2 mb-2">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Orders</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Assignments</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black border border-indigo-100 uppercase">
                        {OrderData?.length} Jobs
                    </div>
                </div>

                {OrderData?.map((order) => (
                    <div key={order._id} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                        {/* {console.log('accepted page', ['Picked'].includes(order.orderstatus))} */}
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[11px] font-black text-slate-400 tracking-tighter uppercase">ID: {order?._id}</span>
                            </div>
                            <div className="flex items-center text-emerald-600 font-black text-xl">
                                <IndianRupee size={18} strokeWidth={3} />
                                {order?.totalPayment}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center gap-2">
                                <User size={14} strokeWidth />
                                <span className="text-[11px] font-semibold text-slate-600 tracking-widest ">Name : {order?.user}</span>
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
                                    onClick={() => updateStatus(order?._id, "outfordelivery")}
                                    className="flex-[4] bg-blue-600 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all text-sm tracking-tight"
                                >
                                    <Navigation size={16} className="rotate-45 fill-white" />
                                    Start Trip
                                </button>
                            )}

                            {order?.orderstatus === "outfordelivery" && (
                                <>
                                    <button
                                        onClick={() => updateStatus(order?._id, "cancelled")}
                                        className="flex-[4] bg-red-600 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all text-sm tracking-tight"
                                    >
                                        {/* <Navigation size={16} className="rotate-45 fill-white" /> */}
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => updateStatus(order?._id, "completed")}
                                        className="flex-[4] bg-blue-600 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all text-sm tracking-tight"
                                    >
                                        {/* <Navigation size={16} className="rotate-45 fill-white" /> */}
                                        Mark Delivered
                                    </button>
                                </>
                            )}


                            {order?.orderstatus === "completed" && (
                                <div className="flex-[4] bg-emerald-50 text-emerald-600 font-bold py-4 rounded-[1.5rem] border border-emerald-100 flex items-center justify-center gap-2 text-sm">
                                    <PackageCheck size={18} />
                                    Completed
                                </div>
                            )}
                            {order?.orderstatus === "cancelled" && (
                                <div className="flex-[4] bg-red-300 text-red-500 font-bold py-4 rounded-[1.5rem] border border-emerald-100 flex items-center justify-center gap-2 text-sm">
                                    <PackageCheck size={18} />
                                    Cancelled
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

export default AcceptedOrderList;