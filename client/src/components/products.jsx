import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./config";
export const Product = () => {
    const { setitem } = useContext(userContext);
    const navigate = useNavigate();
    const handleproduct = async (p) => {
        //abhi ish ka response off hai backend se 
        const response = await axios.get(`http://localhost:3000/${p}`);
        setitem([response.data]);
        navigate('/menu');
    }

    const fetchalldata = async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['homepagedata'],
        queryFn: fetchalldata
    });


    return <>
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-bold text-center text-pepsi-blue mb-12" data-aos="fade-up">Our Popular Drinks</h2>
                {/* <!-- Products --> */}{
                    isLoading && <div className="flex justify-center "> <div className="flex justify-center border border-t-blue-500 border-4 border-gray-400 animate-spin rounded-full w-8 h-8 bg-blue">
                    </div></div>
                }
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
                        data?.Homepageproduct?.slice(0, 3).map((product, p) => (
                            <div
                                key={p}
                                onClick={() => handleproduct(product.name)}
                                class="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md drink-card transition duration-300 hover:shadow-lg sm:hover:shadow-xl"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div class="relative">
                                    <img
                                        src={product.imagelink}
                                        alt={product.name}
                                        class="w-full h-35 sm:h-56 md:h-64 object-cover"
                                    />
                                    <div class="offer-badge bg-pepsi-red text-xs sm:text-sm">10% OFF</div>
                                </div>
                                <div class="p-2 sm:p-5 md:p-6">
                                    <h3 class="text-sm sm:text-xl font-semibold text-gray-800">Product name : <span className="text-gray-500 text-sm">{product.name}</span></h3>
                                    <p class="text-gray-600 text-sm sm:text-base mt-2"><span className="font-semibold text-gray-800">Discription : </span>{product.dis}</p>
                                    <div class="mt-3 sm:mt-4 flex justify-between items-center">
                                        <span class="text-lg sm:text-xl font-bold text-pepsi-blue"><span className="font-semibold text-gray-800">Price : </span>₹{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div class="text-center mt-10">
                    <Link to="/menu" class="inline-flex items-center text-pepsi-red font-semibold hover:text-red-700 transition duration-300">
                        View Full Menu <i data-feather="chevron-right" class="ml-1"></i>
                    </Link>
                </div>
            </div>
        </section>
    </>
}