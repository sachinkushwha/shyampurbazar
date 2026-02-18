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
        const response = await axios.get(`${BASE_URL}/item/menuitem`);
        return response.data;
    }
    const { data, isLoading } = useQuery({
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

    // const userRole=User?.role || 'user';

    const { item } = useContext(userContext);
    // console.log("context data", item);
    console.log("menu data", data);


    const [count, setcount] = useState(JSON.parse(localStorage.getItem(User?.username + 'pepsicart')) || {});
    const handlecount = (id, name, price, ownerid) => {
        console.log("handle pe", ownerid);
        if (!User) {
            navigate(`/login/user`);
            return
        }
        setcount(pre => ({
            ...pre, [id]: {
                ownerid: ownerid,
                name: name,
                price: price,
                qty: (pre[id]?.qty || 0) + 1,

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
                    {
                        isLoading && (
                            <div className="flex justify-center "> <div className="flex justify-center border border-t-blue-500 border-4 border-gray-400 animate-spin rounded-full w-8 h-8 bg-blue">
                            </div>
                            </div>
                        )
                    }

                    {/* Products */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {data?.itemdata?.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden text-sm"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <div className="h-28 bg-gray-100 flex items-center justify-center p-1">
                                        <img
                                            src={item.ImageLink}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    {item.discount && (
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                                            {item.discount}% OFF
                                        </span>
                                    )}

                                    {item.isCold && (
                                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                                            ❄ Cold
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-2 space-y-1">

                                    <h3 className="font-medium text-gray-800 truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        {item.Quantity}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-blue-700">
                                            ₹{item.price}
                                        </span>

                                        {item.mrp && (
                                            <span className="text-xs text-gray-400 line-through">
                                                ₹{item.mrp}
                                            </span>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        {!count[item._id] ? (
                                            <button
                                                onClick={() =>
                                                    handlecount(item._id, item.name, item.price, item.ownerId)
                                                }
                                                className="cursor-pointer w-full bg-blue-700 hover:bg-blue-800 text-white py-1.5 rounded text-xs transition"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => handleDecrement(item._id)}
                                                    className="w-7 h-7 bg-red-500 text-white rounded-full text-sm"
                                                >
                                                    −
                                                </button>

                                                <span className="text-sm font-medium">
                                                    {count[item._id].qty}
                                                </span>

                                                <button
                                                    onClick={() => handleIncrement(item._id)}
                                                    className="w-7 h-7 bg-green-500 text-white rounded-full text-sm"
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