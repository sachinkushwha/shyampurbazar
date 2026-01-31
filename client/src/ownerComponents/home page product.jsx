import axios from "axios";
import { useContext } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context Api/userManagment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const Homepageproducts = () => {
    const { User } = useContext(userContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handlupdate = (id) => {
        console.log("update id", id);
        navigate(`/owner/Home/update/${id}`);
    }

    const deleteFunction = async (id) => {
        const response = await axios.delete(`http://localhost:3000/item/home/delete/${id}`,
            { headers: { "authorization": User.token } });
        return response.data;
    }

    const deleteMutation = useMutation({
        mutationKey: ['deletehomepagedata'],
        mutationFn: deleteFunction,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['homepagedata']);
        }
    })

    const handledelete = (id) => {
        deleteMutation.mutate(id);
    }

    const getHomePageData = async () => {
        try {
            const response = await axios.get('http://localhost:3000');
            setHomePageData(response.data.Homepageproduct);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['homepagedata'],
        queryFn: getHomePageData
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">

            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Our Products
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Discover amazing products at great prices
                        </p>
                    </div>

                    {/* Add Product Button */}
                    <Link to='/owner/addproduct' className="cursor-pointer group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <Plus className="w-5 h-5" />Add New Product
                    </Link>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Products Count */}
                        <div className="mb-6">
                            <div className="inline-block bg-white px-4 py-2 rounded-full shadow">
                                <span className="text-gray-700">
                                    Showing <span className="font-bold text-blue-600">{data?.Homepageproduct?.length}</span> products
                                </span>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {data?.Homepageproduct
                            ?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {data.Homepageproduct.map((home, p) => (
                                    <div
                                        key={p}
                                        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:transform hover:-translate-y-2"
                                    >
                                        {/* Product Image Placeholder */}
                                        <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10"></div>
                                            <div className="relative z-10 text-center">
                                                <div className=" mx-auto rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
                                                    <img src={home.imagelink} alt="Product Image" className="max-w-full max-h-full object-contain" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                                                    {home.name}
                                                </h3>
                                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                    New
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {home.dis}
                                            </p>

                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                                <div>
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        ₹{home.price}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                                                </div>


                                            </div>
                                            <div className="flex mt-2 justify-center gap-11 ">
                                                <button onClick={() => handledelete(home._id)} className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg">
                                                    Delete
                                                </button>
                                                <button onClick={() => handlupdate(home._id)} className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg">
                                                    Update
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hover Effect Indicator */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl">📦</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-6">Add some products to get started</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                                    Add Your First Product
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}