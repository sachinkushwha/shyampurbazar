import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Context Api/userManagment";

export const ViewCart = () => {
    const {User}=useContext(userContext);
    const [cart, setCart] = useState({});
    // localStorage se cart data load karna
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(User?.username+"pepsicart")) || {};
        setCart(storedCart);

        // agar cart kisi page se update hota hai, to refresh
        const handleCartChange = () => {
            const updatedCart = JSON.parse(localStorage.getItem("pepsicart")) || {};
            setCart(updatedCart);
        };

    }, []);

    const handleIncrement = (id) => {
        const newCart = {
            ...cart,
            [id]: {
                ...cart[id],
                qty: (cart[id]?.qty || 0) + 1
            }
        };
        setCart(newCart);
        localStorage.setItem(User?.username+"pepsicart", JSON.stringify(newCart));
    };

    const handleDecrement = (id) => {
        const newCart = { ...cart };
        if ((newCart[id]?.qty || 0) - 1 <= 0) {
            delete newCart[id];

        } else {
            newCart[id] = {
                ...newCart[id],
                qty: newCart[id]?.qty - 1
            }
        }
        setCart(newCart);
        localStorage.setItem(User?.username+"pepsicart", JSON.stringify(newCart));
        window.dispatchEvent(new Event('changecartvalue'));
    };
    const cartItems = Object.entries(cart || {});
    let total = 0;
    cartItems.map(([id, item]) => {
        total += item.price * item.qty;
    })

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg shadow-md">
                        <p className="text-lg font-medium text-gray-700 mb-4">Your cart is empty!</p>
                        <Link
                            to="/menu"
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                        >
                            Add Item
                        </Link>
                    </div>

                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map(([id, item]) => (
                            <div key={item.name} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p className="text-gray-600 mt-2">Price: ₹{item.price}</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDecrement(id)}
                                    >
                                        -
                                    </button>
                                    <p className="text-lg font-semibold">{item.qty}</p>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleIncrement(id)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="mt-2 font-bold text-lg text-gray-800">
                                    Subtotal: <span className="text-green-600">₹{item.price * item.qty}</span>
                                </p>


                            </div>
                        ))}
                        <div className="col-span-full bg-gray-100 rounded-lg p-4 mt-4 shadow-md flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-700">Total:</span>
                            <span className="text-xl font-bold text-green-600">₹{total}</span>
                        </div>


                    </div>
                )}
            </div>
        </section>
    );
};
