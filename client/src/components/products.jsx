import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
import { useQuery } from "@tanstack/react-query";
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
        const response = await axios.get('http://localhost:3000');
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
                            <div key={p} onClick={() => handleproduct(product.name)} class=" cursor-pointer bg-white rounded-lg overflow-hidden shadow-md drink-card transition duration-300" data-aos="fade-up" data-aos-delay="100">
                                <div class="relative">
                                    <img src={product.imagelink} alt="Pepsi" class="w-full h-64 object-cover" />
                                    <div class="offer-badge bg-pepsi-red">10% OFF</div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p class="text-gray-600 mt-2">{product.dis}</p>
                                    <div class="mt-4 flex justify-between items-center">
                                        <span class="text-xl font-bold text-pepsi-blue">₹{product.price}</span>
                                        {/* <button class="bg-pepsi-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                                            Add to Cart
                                        </button> */}
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