import { useContext, useEffect, useState } from "react"
import { userContext } from '../Context Api/userManagment'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./config";
export const Categorie = () => {
    const navigate = useNavigate();
    const { User } = useContext(userContext);
    const [selectcategori, setselectcategori] = useState("");

    const fetchalldata = async () => {
        const response = await axios.get(`${BASE_URL}item/menuitem`);
        return response.data;
    }
    const { data } = useQuery({
        queryKey: ['menudata'],
        queryFn: fetchalldata,
    });
    const categ = [
        {
            category: "All Drinks"
        },
        {
            category: "Pepsi Products"
        },
        {
            category: "Cola Drinks"
        },
        {
            category: "Juices"
        },
        {
            category: "Energy Drinks"
        },
        {
            category: "Water"
        },
    ]



    const { item } = useContext(userContext);
    // console.log("context data", item);
    console.log("menu data", data);


    const [count, setcount] = useState(JSON.parse(localStorage.getItem(User?.username + 'pepsicart')) || {});
    const handlecount = (id, name, price) => {
        if (!User) {
            navigate('/login');
            return
        }
        setcount(pre => ({
            ...pre, [id]: {
                name: name,
                price: price,
                qty: (pre[id]?.qty || 0) + 1
            }
        }));
    }
    const handleIncrement = (id) => {
        if (!User) {
            navigate('/login');
            return
        }
        setcount(pre => ({
            ...pre, [id]: {
                ...pre[id],
                qty: (pre[id]?.qty || 0) + 1
            }
        }));
    }
    const handleDecrement = (id) => {
        if (!User) {
            navigate('/login');
            return
        }
        setcount(pre => {
            const newcount = { ...pre }
            if ((newcount[id]?.qty || 0) - 1 <= 0) {
                delete newcount[id];
            } else {
                newcount[id] = {
                    ...newcount[id],
                    qty: newcount[id]?.qty - 1
                }
            }
            return newcount
        });
    }
    useEffect(() => {
        localStorage.setItem(User?.username + 'pepsicart', JSON.stringify(count));
        window.dispatchEvent(new Event('changecartvalue'));
    }, [count]);

    return (
        <>
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categ.map((cat) => (
                            <button
                                key={cat.category}
                                onClick={() => setselectcategori(cat.category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium border transition
                                        ${selectcategori === cat.category
                                        ? "bg-blue-700 text-white border-blue-700"
                                        : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                                    }`}
                            >
                                {cat.category}
                            </button>
                        ))}
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.itemdata?.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <div className="h-48 bg-gray-100 flex items-center justify-center p-2">
                                        <img
                                            src={item.ImageLink}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>


                                    {/* Discount */}
                                    {item.discount && (
                                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                                            {item.discount}% OFF
                                        </span>
                                    )}

                                    {/* Cold */}
                                    {item.isCold && (
                                        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                            ❄ Cold
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-2">

                                    {/* Brand + Category */}
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>{item.brand}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h3>

                                    {/* Size */}
                                    <p className="text-sm text-gray-500">
                                        Quantity: {item.Quantity}
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {item.dis}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-blue-700">
                                            ₹{item.price}
                                        </span>

                                        {item.mrp && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{item.mrp}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stock + Delivery */}
                                    <div className="flex justify-between text-xs">
                                        <span
                                            className={`font-medium ${item.stock > 0 ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {item.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>

                                        <span className="text-gray-500">
                                            🚚 {item.deliveryTime || "30 mins"}
                                        </span>
                                    </div>

                                    {/* Cart Buttons */}
                                    <div className="pt-3 flex justify-between items-center">
                                        {!count[item._id] ? (
                                            <button
                                                onClick={() =>
                                                    handlecount(item._id, item.name, item.price)
                                                }
                                                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-sm font-medium transition"
                                            >
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-4 mx-auto">
                                                <button
                                                    onClick={() => handleDecrement(item._id)}
                                                    className="w-9 h-9 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                >
                                                    −
                                                </button>

                                                <span className="font-semibold">
                                                    {count[item._id].qty}
                                                </span>

                                                <button
                                                    onClick={() => handleIncrement(item._id)}
                                                    className="w-9 h-9 bg-green-500 text-white rounded-full hover:bg-green-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}