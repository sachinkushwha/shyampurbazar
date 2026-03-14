import axios from "axios";
import { useContext } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context Api/userManagment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../components/config";
import toast from "react-hot-toast";
import { Edit, Trash2, Store } from "lucide-react";

export const Homepageproducts = () => {
    const { User } = useContext(userContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handlupdate = (id) => {
        navigate(`/owner/Home/update/${id}`);
    }

    const deleteFunction = async (id) => {
        const response = await axios.delete(`${BASE_URL}/item/home/delete/${id}`,
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
            const response = await axios.get(`${BASE_URL}/sellerprofile/profile`,{
               headers:{
                'authorization':User?.token
               }
            });
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
     
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Seller Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your store information and details
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <Store className="text-white w-16 h-16 opacity-80" />
          </div>

          {/* Profile Content */}
          <div className="p-8">

            {/* Logo + Shop Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* Logo */}
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg -mt-16 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/120"
                  alt="Shop Logo"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  My Awesome Store
                </h2>

                <p className="text-gray-600 mt-1">
                  Owner: Sachin Kushwaha
                </p>

                <p className="text-gray-600">
                  Email: sachin@email.com
                </p>

                <p className="text-gray-600">
                  Phone: +91 9876543210
                </p>

                <p className="text-gray-600">
                  Address: Patna, Bihar
                </p>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

              <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm">
                <h3 className="text-2xl font-bold text-blue-600">25</h3>
                <p className="text-gray-600 text-sm">Total Products</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm">
                <h3 className="text-2xl font-bold text-green-600">120</h3>
                <p className="text-gray-600 text-sm">Total Orders</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm">
                <h3 className="text-2xl font-bold text-purple-600">₹45,000</h3>
                <p className="text-gray-600 text-sm">Total Revenue</p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition">
                <Edit className="w-4 h-4" />
                Update Profile
              </button>

              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow transition">
                <Trash2 className="w-4 h-4" />
                Delete Profile
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
    