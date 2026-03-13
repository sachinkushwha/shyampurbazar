import { useNavigate, Link } from "react-router-dom"
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./config";
export const Product = () => {
    const { setitem } = useContext(userContext);
    const navigate = useNavigate();
    const handleproduct = async (id) => {
        // //abhi ish ka response off hai backend se 
        // const response = await axios.get(`http://localhost:3000/${p}`);
        // setitem([response.data]);
        navigate(`/menu/${id}`);
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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-pepsi-blue mb-12" data-aos="fade-up">Our Popular Venters</h2>
                {/* <!-- Products --> */}{
                    isLoading && <div className="flex justify-center "> <div className="flex justify-center border border-t-blue-500 border-4 border-gray-400 animate-spin rounded-full w-8 h-8 bg-blue">
                    </div></div>
                }
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {data?.Homepageproduct?.slice(0, 6).map((product, p) => (

                        <div
                            key={p}
                            onClick={() => handleproduct(product._id)}
                            className="cursor-pointer bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
                        >

                            <img
                                src="https://www.shutterstock.com/shutterstock/photos/230619400/display_1500/stock-vector-shop-icon-store-230619400.jpg"
                                alt={product.name}
                                className="w-full h-20 object-contain"
                            />

                            <div className="p-1 text-center">
                                <h3 className="text-xs font-semibold text-gray-800 ">
                                    {product.storeName}
                                </h3>
                            </div>

                        </div>

                    ))}
                </div>
                <div className="text-center mt-10">
                    {/* <Link to="/menu" className="inline-flex items-center text-pepsi-red font-semibold hover:text-red-700 transition duration-300">
                        View Full Menu <i data-feather="chevron-right" className="ml-1"></i>
                    </Link> */}
                </div>
            </div>
        </section>
    </>
}