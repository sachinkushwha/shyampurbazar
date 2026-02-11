import { HandHelpingIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context Api/userManagment";
import { menuContex } from "./ownerContexApi/menuDataManagement";
export const AddingMenuItem = () => {

    const { id } = useParams();
    const { MenuData ,setMenuData} = useContext(menuContex);
    const oldmenudata = MenuData.filter(md => md._id === id);
    console.log(oldmenudata)

    const { User } = useContext(userContext);
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        name: "",
        price: "",
        Quantity: "",
        ImageLink:"",
        dis: ""
    });

    useEffect(() => {
        if (oldmenudata) {
            setformdata({
                name: oldmenudata[0]?.name || "",
                price: oldmenudata[0]?.price || "",
                Quantity: oldmenudata[0]?.Quantity || "",
                ImageLink: oldmenudata[0]?.ImageLink || "",
                dis: oldmenudata[0]?.dis || ""
            })
        }
    }, [id, MenuData]);

    const handlonchange = (e) => {
        const { name, value } = e.target;
        setformdata(prev => ({
            ...prev, [name]: value
        }));
    }



    const handlesubmit = async (e) => {
        e.preventDefault();
        if (id) {
            const response = await axios.put(`http://localhost:3001/item/update/${id}`, formdata, { headers: { 'authorization': User.token } });
            if (response.data.message) {
                alert(response.data.message);
                const newdata=MenuData.filter(md=>md._id!==id);
                setMenuData([...newdata,response.data.updatedData]);
                navigate('/owner/menuitem');
            } else {
                alert("something is worong");
            }
        } else {
            const response = await axios.post('http://localhost:3001/item/addmenuitem', formdata, {
                headers: { 'authorization': User.token }
            });
            setMenuData([...MenuData,response.data.newitem]);
            alert(formdata.dis);
            navigate('/owner/menuitem');
        }

    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {id ? 'Update Menu Item' : 'Add Menu Item'}
                </h1>

                <form onSubmit={handlesubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="productName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Enter product name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="name"
                            value={formdata.name}
                            onChange={handlonchange}
                            autoFocus
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formdata.price}
                            onChange={handlonchange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="Quantity"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Quantity
                        </label>
                        <input
                            type="text"
                            id="Quantity"
                            name="Quantity"
                            value={formdata.Quantity}
                            onChange={handlonchange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="ImageLink"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            ImageLink
                        </label>
                        <input
                            type="text"
                            id="ImageLink"
                            name="ImageLink"
                            value={formdata.ImageLink}
                            onChange={handlonchange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="dis"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Describe your product
                        </label>
                        <textarea
                            type="text"
                            id="dis"
                            value={formdata.dis}
                            name="dis"
                            onChange={handlonchange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/owner/menuitem')}
                            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {id ? 'Update' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}