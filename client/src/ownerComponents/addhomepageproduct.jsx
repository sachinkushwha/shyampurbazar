import { useContext} from "react"
import axios from "axios";
import { userContext } from "../Context Api/userManagment";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast'
import { BASE_URL } from "../components/config";
export const AddHomePageProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { User } = useContext(userContext)
const OneHomePageData=async()=>{
    const response =await axios.get(`${BASE_URL}/OneHomepagedata/${id}`,{
        headers:{
            'authorization':User?.token
        }
    });
    return response.data;
}
    const {data}=useQuery({
        queryFn:OneHomePageData
    });
    console.log(data);

    const handleCancel = () => {
        navigate('/owner/home');
    }

    const handlesubmitdata = async (value) => {
        if (id) {
            const response = await axios.put(`http://localhost:3001/item/homepageproduct/update/${id}`, value, {
                headers: { 'authorization': User.token }
            });
            return response.data;
        } else {
            const response = await axios.post('http://localhost:3001/addhomepageproduct', value, {
                headers: { 'authorization': User.token }
            });
            return response.data;
        }
    }
    const homepageMutation = useMutation({
        mutationKey: ['addhomepage'],
        mutationFn: handlesubmitdata,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/owner/Home');
        }
    })
    const handlesubmit = async (value) => {
        homepageMutation.mutate({
            value
        });

    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        name: data?.product?.name || "",
                        price: data?.product?.price || "",
                        imagelink: data?.product?.imagelink || "",
                        dis: data?.product?.dis || ""
                    }
                }
                onSubmit={(value, { resetForm }) => {
                    handlesubmit(value);
                    if (!OneHomePageData) {
                        resetForm();
                    } 
                }
                }
                className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
            >
                <Form>
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">{id ? 'Update Homepage Product' : 'Add Homepage Product'}</h2>

                    <label htmlFor="name" className="block text-gray-600 font-medium mb-1">Name:</label>
                    <Field
                        type="text"
                        name="name"
                        id="name"
                        autoFocus
                        placeholder="Enter product name"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <label htmlFor="price" className="block text-gray-600 font-medium mb-1">Price:</label>
                    <Field
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label htmlFor="imagelink" className="block text-gray-600 font-medium mb-1">ImageLink:</label>
                    <Field
                        type="text"
                        name="imagelink"
                        id="imagelink"
                        placeholder="Enter image link"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <label htmlFor="dis" className="block text-gray-600 font-medium mb-1">Description:</label>
                    <Field
                        as="textarea"
                        name="dis"
                        id="dis"
                        placeholder="Enter product description"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></Field>
                    <div className="flex justify-around">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="cursor-pointer w-[100px] sm:w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer w-[100px] sm:w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                        >
                            {id ? 'Update' : 'Add'}
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}