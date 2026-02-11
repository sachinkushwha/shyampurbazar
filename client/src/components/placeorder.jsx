import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context Api/userManagment";

export const PlaceOrder = () => {
    const { User } = useContext(userContext);
    const [cart, setCart] = useState({});
    const [Address, getAddress] = useState();
    const navigate = useNavigate();

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(User?.username + "pepsicart")) || {};
        setCart(storedCart);
    }, [User]);
// console.log('final check',cart)
    const cartItems = Object.entries(cart);
    // console.log("cart entris", cartItems);

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

            // console.log("cart", cart);
            const items = Object.values(cart).map((n) => (
                {
                    ownerid: n.ownerid,
                    name: n.name,
                    qty: n.qty,
                    price: n.price
                }
            ));
            // console.log("ready data",items);
            // const items =Object.entries(cart).map(([key,value])=>({
            //     ownerid:key,
            //     name:value.name,
            //     qty:value.qty,
            //     price:value.price,
            // }));

            let finalorder = {
                user: User?.username,
                // ownerid: User?.userid,
                item: items,
                address: Address,
                totalPayment: total
            }
            // console.log("New order:", cart);
            localStorage.setItem(User?.username + "orderpepsicart", JSON.stringify(finalorder));
            // console.log(User?.username + "pepsicart");

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
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Address</h3>
                    <form className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-blue-600">
                            <input
                                type="radio"
                                name="Address"
                                id="shyampur"
                                value="shyampur bazar"
                                onChange={(e) => getAddress(e.target.value)}
                                className="accent-blue-600"
                            />
                            Shyampur Bazar
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-blue-600">
                            <input
                                type="radio"
                                name="Address"
                                id="gopalganj"
                                value="gopalganj"
                                onChange={(e) => getAddress(e.target.value)}
                                className="accent-blue-600"
                            />
                            Gopalganj
                        </label>
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
                            </div>

                            <div className="flex justify-between mt-4 text-lg font-bold text-gray-800">
                                <span>Total:</span>
                                <span className="text-green-600">₹{total}
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
