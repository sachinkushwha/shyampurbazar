import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { userContext } from "../Context Api/userManagment";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../components/config";



export const MenuItem = () => {
    const queryClient = useQueryClient();
    const { User } = useContext(userContext);
    const navigate = useNavigate();

    const getMenuItem = async () => {
        const response = await axios.get(`${BASE_URL}/item/Ownermenuitem`, {
            headers: { 'authorization': User?.token }
        });
        return response.data;
    }

    const { data } = useQuery({
        queryKey: ['Ownermenuitem'],
        queryFn: getMenuItem
    });

    const handleUpdate = (id) => {
        navigate(`/owner/update/${id}`);
    }

    const handlDelete = async ({ id }) => {
        const response = await axios.delete(`${BASE_URL}/item/delete/${id}`, {
            headers: { 'authorization': User.token }
        });
    }

    const deleteMutation = useMutation({
        mutationFn: handlDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Ownermenuitem']
            })
            alert('item delete successfuly');
        }
    })

    const handleDelete = (id) => {
        deleteMutation.mutate({
            id: id
        })
    }


    return (

        <div className="container mx-auto px-4 py-8">
            {/* Add Item Button (Side) */}

            
                <div className="flex justify-center mt-30">
                    {!data && <h1 className="text-3xl font-bold">No Data Available Please Add Some Product Useing Add Item Buttom</h1>}
                </div>
            

            <Link
                to="/owner/addmenuitem"
                className="fixed top-6 right-6 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 mt-15 rounded-full shadow-lg transition-all duration-300"
            >
                ➕ Add Item
            </Link>


            {/* Grid layout for menu items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.itemdata?.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                        {/* Item Image - you might want to add imageUrl property to your item object */}
                        <div className="h-48 bg-gray-100 flex items-center justify-center p-2">
                            <img
                                src={item.ImageLink}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>


                        <div className="p-5">
                            {/* Item Name */}
                            <h1 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                {item.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-2xl font-bold text-blue-600">
                                    ₹{item.price} {/* Assuming price is in rupees */}
                                </p>
                                {/* Optional: Add rating or badge */}
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                    Popular
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                <span className="font-bold"> Quantity:</span>{item.Quantity}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-2">
                                {item.dis}
                            </p>

                            {/* Action Button */}
                            <div className="flex gap-4">
                                <button onClick={() => handleUpdate(item._id)} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {data?.itemdata?.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No menu items found</h3>
                    <p className="text-gray-500">Add some items to your menu to get started.</p>
                </div>
            )}
        </div>
    );
}