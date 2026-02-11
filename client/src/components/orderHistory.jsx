import { useContext } from "react"
import { userContext } from "../Context Api/userManagment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./config";

export const OrderHistory = () => {
    const { User } = useContext(userContext);

    const fetchallOrderdata = async () => {
        const response = await axios.get(`${BASE_URL}/protected/order`, {
            headers: { 'authorization': User?.token }
        });
        return response.data;
    }
    const { data ,isLoading} = useQuery({
        queryKey: ['orderhistorydata'],
        queryFn: fetchallOrderdata,
    });


    return (
        <>
            <h1 className="text-2xl font-semibold mb-4">Your Active Order</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 hidden md:table">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">item name</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Delivery</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            data?.orderdata?.map(dat => (
                                <tr key={dat._id} className="bg-white shadow rounded">
                                    <td className="p-3">{dat.item[0]?.name}</td>
                                    <td className="p-3">{dat.orderdate}</td>
                                    <td className="p-3 flex justify-between">{dat.orderstatus}
                                        <Link to={`/orderhistory/${dat._id}`} className="cursor-pointer ml-auto hover:text-blue-500 mr-10 bg-blue-100  rounded-lg px-3 py-1">👁️view</Link></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-center">
                    {
                        data?.orderdata?.length===0 && <p className="text-xl mt-5 mb-5">You Have No Active Order  <Link to='/menu' className="font-bold underline text-blue-500">Order Now</Link></p>
                    }
                </div>
            </div>

            {/* Mobile Responsive Card Layout */}
            <div className="md:hidden space-y-3">
                {data?.orderdata?.map((dat) => (
                    <div key={dat._id} className="bg-white shadow p-4 rounded-lg">
                        <p>
                            <span className="font-semibold">Item:</span>{" "}
                            {dat.item[0]?.name}
                        </p>
                        <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {dat.orderdate}
                        </p>
                        <p className="flex justify-between items-center mt-2">
                            <span>{dat.orderstatus}</span>
                            <Link
                                to={`/orderhistory/${dat._id}`}
                                className="bg-blue-100 px-3 py-1 rounded-lg text-sm"
                            >
                                👁️ view
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};