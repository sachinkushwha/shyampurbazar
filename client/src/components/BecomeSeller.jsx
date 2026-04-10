
import { Formik, Form, Field } from 'formik'
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useMutation } from "@tanstack/react-query";
import { CompressImage } from '../utils/ImageCompresser';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useLogout } from "../api/Logout";
import useUserLocation from '../hooks/useUserLocation';
export const BecomeSeller = () => {
  const { location } = useUserLocation();

  const logout = useLogout();
  const navigate = useNavigate();
    console.log('bcomselr', location?.lat, location?.lng);
  const PostBecomeSeller = async (formData) => {
    const response = await axios.post(`${BASE_URL}/bcoomeseller`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 'Cache-Control': 'no-cache'
      },
      withCredentials: true
    });
    return response.data;
  }

  const BecomeSellerMutation = useMutation({
    mutationFn: PostBecomeSeller,
    onSuccess: (data) => {
      toast.success(data.message);
      logout();
    },
    onError:(data)=>{
      toast.error(data?.response?.data?.message);
    }
  });

  const handleSubmit = (formValue) => {

    const formData = new FormData();
    formData.append("storeName", formValue.storeName);
    formData.append("Image", formValue.Image);
    formData.append("role", formValue.role);
    formData.append('location',JSON.stringify(location));
    BecomeSellerMutation.mutate(formData);

  };

  if (!location) return <p>location allow is mendatry</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={{
          storeName: '',
          Image: null,
          role: 'seller'
        }}
        onSubmit={(formData, { resetForm }) => {
          handleSubmit(formData);
        }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        {({ setFieldValue }) => (
          <Form>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Become a Seller
            </h2>

            {/* Store Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Store Name</label>
              <Field
                type="text"
                name="storeName"
                placeholder="Enter store name"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Store Image */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Store Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0]
                  const compressedImage = await CompressImage(file);
                  setFieldValue('Image', compressedImage)
                }}
                className="w-full"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!location}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
