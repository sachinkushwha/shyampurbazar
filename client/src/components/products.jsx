import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import useUserLocation from "../hooks/useUserLocation";
export const Product = () => {
    const navigate = useNavigate();
    const { location, error } = useUserLocation();
    console.log(location, error, 'home page');
    const handleproduct = async (id) => {
        navigate(`/menu/${id}`);
    }

    const fetchalldata = async () => {
        const response = await axios.get(BASE_URL, {
            params: {
                lng: location.lng,
                lat: location.lat
            },
            withCredentials: true
        });
        return response.data;
    }

    const { data, isLoading,isError } = useQuery({
        queryKey: ['homepagedata'],
        queryFn: fetchalldata
    });
    console.log('home page ke dukan', data)
    if(isError){
        return alert(isError)
    }
    console.log('home page ke dukan', data)
    if (error) return <p>{error}</p>
    if (!location) return <p>Please wait </p>


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
                                src={product.store[0].storeImage || 'https://img.freepik.com/free-vector/shop-with-sign-open-design_23-2148544029.jpg?semt=ais_hybrid&w=740&q=80'}
                                alt={product.name}
                                className="w-full h-20 object-contain"
                            />

                            <div className="p-1 text-center">
                                <h3 className="text-xs font-semibold text-gray-800 ">
                                    {product.store[0].storeName}
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