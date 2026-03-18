import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context Api/userManagment";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useQuery } from "@tanstack/react-query";

export const PlaceOrder = () => {
    const { User } = useContext(userContext);
    const [cart, setCart] = useState({});
    const [Address, setAddress] = useState();
    const [delevryCharge, setDeleveryCharge] = useState(40);
    const navigate = useNavigate();


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userlng = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                console.log('lat=', userLat, 'lng=', userlng,'accuracy=',accuracy);
                alert(`lat=${userLat},lng=${userlng},accuracy=${accuracy}`);
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true, // important
                timeout: 15000,           // 15 seconds timeout
                maximumAge: 0             // do not use cached location
            }
        )
    }

    const getaddress = async () => {
        const response = await axios.get(`${BASE_URL}/getaddress`, {
            headers: {
                'authorization': User.token
            }
        });
        return response.data;
    }

    const { data } = useQuery({
        queryKey: ['address'],
        queryFn: getaddress
    });

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(User?.username + "pepsicart")) || {};
        setCart(storedCart);
    }, [User]);
    const cartItems = Object.entries(cart);

    // Calculate total

    let total = 0;
    cartItems.forEach(([id, item]) => {
        total += item.price * item.qty;
    });

    const handlePlaceOrder = () => {
        if (Address) {
            if (cartItems.length === 0) {
                alert("Cart is empty!");
                return;
            }
            const venderOrders = {};

            Object.entries(cart).forEach(([id, item]) => {
                if (!venderOrders[item.ownerid]) {
                    venderOrders[item.ownerid] = [];
                }

                venderOrders[item.ownerid].push({
                    productId: id,
                    name: item.name,
                    qty: item.qty,
                    price: item.price
                })

            });

            const finalorder = Object.entries(venderOrders).map(([vendorId, items]) => {
                const vendorTotal = items.reduce(
                    (sum, i) => sum + i.price * i.qty, 0
                );
                return {
                    vendorId: vendorId,
                    user: User?.username,
                    number: User?.number,
                    address: Address,
                    items: items,
                    totalPayment: vendorTotal
                }
            })


            localStorage.setItem(User?.username + "orderpepsicart", JSON.stringify(finalorder));

            navigate("/payment");
        } else {
            alert("Please select an address");
        }
    };

    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Place Your Order</h2>

                {/* Address Selection */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex justify-between items-center">Select Address
                        <Link
                            to='/addadress'
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                            Add
                        </Link>
                    </h3>
                    <form className="space-y-3">
                        {data?.address.map((addres) => (
                            <label key={addres._id} className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-blue-600">
                                <input
                                    type="radio"
                                    name="Address"
                                    id="shyampur"
                                    value={`${addres.village},${addres.street},${addres.city},${addres.landmark},${addres.pin}`}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="accent-blue-600"
                                />
                                {addres.village},{addres.street},{addres.city},{addres.landmark},{addres.pin}
                            </label>
                        ))}


                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center py-6 bg-gray-50 rounded-lg">Your cart is empty!</p>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-5 shadow-inner">
                            <div className="divide-y divide-gray-200">
                                {cartItems.map(([id, item]) => (
                                    <div key={id} className="py-2 flex justify-between text-gray-700">
                                        <span>
                                            {item.name} <span className="text-gray-500">x {item.qty}</span>
                                        </span>
                                        <span className="font-medium">₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                                <div className="py-2 flex justify-between text-gray-700">
                                    <span>
                                        Delevry charge <span className="text-gray-500"></span>
                                    </span>
                                    {/* <span className="font-medium">₹{delevryCharge}</span> */}
                                    <span className="font-medium">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4 text-lg font-bold text-gray-800">
                                <span>Total:</span>
                                <span className="text-green-600">₹{total + delevryCharge}
                                </span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                            >
                                Pay Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
