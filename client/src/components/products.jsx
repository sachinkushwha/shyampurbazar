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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-pepsi-blue mb-12" data-aos="fade-up">Our Popular Products</h2>
                {/* <!-- Products --> */}{
                    isLoading && <div className="flex justify-center "> <div className="flex justify-center border border-t-blue-500 border-4 border-gray-400 animate-spin rounded-full w-8 h-8 bg-blue">
                    </div></div>
                }
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">

                    {
                        data?.Homepageproduct?.slice(0, 3).map((product, p) => (

                            <div
                                key={p}
                                onClick={() => handleproduct(product.name)}
                                className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md drink-card transition duration-300 hover:shadow-lg sm:hover:shadow-xl"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className="relative">
                                    <Link to='/menu'>
                                        <img
                                            src={product.imagelink}
                                            alt={product.name}
                                            className="w-full h-32 sm:h-45 md:h-45 object-contain"
                                        />
                                    </Link>


                                </div>
                                <div className="p-2 sm:p-4 md:p-4">
                                    <div className=" bg-green-500 inline text-xs sm:text-sm">10% OFF</div>

                                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Product name : <span className="text-gray-500 text-sm">{product.name}</span></h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1"><span className="font-semibold text-gray-800">Discription : </span>{product.dis}</p>
                                    {/* <div className="mt-2 sm:mt-3 flex justify-between items-center">
                                        <span className="text-lg sm:text-xl font-bold text-pepsi-blue"><span className="font-semibold text-gray-800">Price : </span>₹{product.price}</span>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="text-center mt-10">
                    <Link to="/menu" className="inline-flex items-center text-pepsi-red font-semibold hover:text-red-700 transition duration-300">
                        View Full Menu <i data-feather="chevron-right" className="ml-1"></i>
                    </Link>
                </div>
            </div>
        </section>
    </>
}