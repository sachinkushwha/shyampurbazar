import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
export const Nav = ({ navdata }) => {
    const { User, logOutUser } = useContext(userContext);
    const path = useLocation();
    const [selected, setselected] = useState(path.pathname.slice(1));
    const [mobilemenu, setmobilemenu] = useState(false);
    const [itemno, setitemno] = useState();
    // console.log("nav", itemno);
    useEffect(() => {
        setselected(path.pathname.slice(1));
    }, [path]);

    useEffect(() => {
        // console.log('nav');
        const cartitem = () => {
            const cartitem = JSON.parse(localStorage.getItem(User?.username + 'pepsicart')) || {};
            const cartitems = Object.keys(cartitem).length;
            setitemno(cartitems)
        }
        cartitem()
        window.addEventListener("changecartvalue", cartitem);

        return () => {
            window.removeEventListener('changecartvalue', cartitem);
        };
    }, [User]);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">

            <div className="max-w-6xl mx-auto px-4">
                {/* Desktop + Mobile container */}

                <div className="flex justify-between items-center py-2">

                    {/* Logo */}
                    <div className="md:block hidden">
                        <button onClick={() => setmobilemenu(!mobilemenu)} className="outline-none">
                            <FiMenu className="w-6 h-6 text-gray-500 cursor-pointer" />
                        </button>
                    </div>
                    <Link to={navdata.homelink} className="flex items-center py-2 px-2">
                        <img src="/image.png" alt="Pepsi Logo" className="h-10" />
                        <i className="text-sm sm:text-xl font-bold ml-2 text-pepsi-blue">Shyampur Bazar</i>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to={navdata.homelink} className={`py-4 px-2 ${selected === "home" ? 'border-b-4 border-blue-500 font-semibold' : 'text-gray-500'} font-semibold`} onClick={() => setselected("home")}>Home</Link>
                        <Link to={navdata.menulink} className={`py-4 px-2 ${selected === "menu" ? 'border-b-4 border-blue-500 font-semibold' : 'text-gray-500'} font-semibold`} onClick={() => setselected("menu")}>Menu</Link>
                        {navdata.pagetype !== 'owner' && <Link to="/about" className={`py-4 px-2 ${selected === "about" ? 'border-b-4 border-blue-500 font-semibold' : 'text-gray-500'} font-semibold`} onClick={() => setselected("about")}>About</Link>}
                        {/* <a href="#" className={`py-4 px-2 ${selected === "contact" ? 'border-b-4 border-blue-500 font-semibold' : 'text-gray-500'} font-semibold`} onClick={() => setselected("contact")}>Contact</a> */}
                    </div>

                    {/* Cart + Order button (desktop) */}
                    <div className="hidden md:flex items-center space-x-3">
                        {navdata.pagetype !== 'owner' && <Link to="/viewcart" className="flex items-center space-x-1 text-gray-500 hover:text-pepsi-blue transition duration-300">
                            <FiShoppingCart className="w-6 h-6" />
                            {
                                User ? (<span className="bg-pepsi-red text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{itemno}</span>) : ('')
                            }

                        </Link>}
                        {navdata.pagetype !== 'owner' && <Link to="viewcart" className="py-2 px-2 font-medium text-white bg-blue-400 rounded hover:bg-blue-700 transition duration-300">View Cart</Link>}

                        {User ? (<button onClick={() => { logOutUser() }} className="cursor-pointer  py-2 px-2 font-medium text-white bg-red-400 rounded hover:bg-red-700 transition duration-300">LogOut</button>)
                            :
                            (
                                <Link to={navdata.loginlink} className="py-2 px-2 font-medium text-white bg-blue-400 rounded hover:bg-blue-700 transition duration-300">Login</Link>
                            )
                        }

                    </div>
                    {/*shopping icon for mobile*/}
                    <div className="sm:hidden  items-center space-x-3">
                        <Link to="/viewcart" className="flex items-center space-x-1 text-gray-500 hover:text-pepsi-blue transition duration-300">
                            <FiShoppingCart className="w-6 h-6" />
                        </Link>

                    </div>


                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setmobilemenu(!mobilemenu)} className="outline-none">
                            <FiMenu className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`fixed top-0 left-0 h-full w-55 bg-white shadow-lg transform ${mobilemenu ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-xl font-bold text-pepsi-blue">Drinks Shop</span>
                    <button onClick={() => setmobilemenu(false)} className="cursor-pointer text-gray-500 font-bold">X</button>
                </div>
                <ul className="flex flex-col mt-4 space-y-2">
                    <li><Link to="/" className="px-4 py-3  hover:bg-gray-100 font-semibold" onClick={() => setmobilemenu(false)}>Home</Link></li>
                    <li><Link to="/orderhistory" className="px-4 py-3  hover:bg-gray-100 font-semibold" onClick={() => setmobilemenu(false)}>OrderHistory</Link></li>
                    <li><Link to="/menu" className="px-4 py-3 hover:bg-gray-100 font-semibold" onClick={() => setmobilemenu(false)}>Menu</Link></li>
                    <li><a href="/about" className="px-4 py-3 hover:bg-gray-100 font-semibold" onClick={() => setmobilemenu(false)}>About</a></li>{
                        User ? (
                            <li><Link to={User?.role === 'user' ? `/signup/${'seller'}` : '/owner'} className="px-4 py-3 hover:bg-gray-100 font-semibold" onClick={() => setmobilemenu(false)}>{User?.role === 'user' ? 'become a seller' : 'your store'}</Link></li>
                        ) : ''
                    }

                </ul>
            </div>
        </nav>
    )
}
