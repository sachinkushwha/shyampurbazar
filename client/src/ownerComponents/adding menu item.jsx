import { HandHelpingIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context Api/userManagment";
import { menuContex } from "./ownerContexApi/menuDataManagement";
import { Formik, Form, Field } from 'formik';
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../components/config";
export const AddingMenuItem = () => {

    const { id } = useParams();
    const { MenuData, setMenuData } = useContext(menuContex);
    const oldmenudata = MenuData.filter(md => md._id === id);
    console.log(oldmenudata)

    const { User } = useContext(userContext);
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        name: "",
        price: "",
        Quantity: "",
        ImageLink: "",
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


const getOneMenuItem=async()=>{
    if(!id) return null;
    const response=await axios.get(`${BASE_URL}/item/onemenuitem/${id}`,{
        headers:{
            'authorization':User.token
        }
    });
    return response.data;
}

const {data}=useQuery({
    queryKey:['OneMenuItem',id],
    queryFn:getOneMenuItem,
});


    const handlesubmitFormData = async (formdata) => {
        if (id) {
            try {
                const response = await axios.put(`http://localhost:3001/item/update/${id}`, formdata, { headers: { 'authorization': User.token } });
                return response.data;
            }catch(err){
                console.log('menu item update karne me error aaya hai',err);
            }
           
           
        } else {
            try {
                const response = await axios.post('http://localhost:3001/item/addmenuitem', formdata, {
                    headers: { 'authorization': User.token }
                });
                return response.data;
            } catch (err) {
                console.log('new item add karne pe koi error aaya hai ', err);
            }

        }

    }
    const FormSubmitMutation = useMutation({
        mutationKey: ['addManuData'],
        mutationFn: handlesubmitFormData,
        onSuccess: (data) => {
            alert(data.message);
            navigate('/owner/menuitem');
        }
    })
    const handlesubmit = (value) => {
        FormSubmitMutation.mutate(value)
    }
    return (
        <div className="bg-gray-50 flex items-center justify-center">
            <div className="bg-[linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url('https://t3.ftcdn.net/jpg/18/12/06/72/240_F_1812067284_a0L2rXGHwwHyEyWAhJ6QT3tZaWR5YOLX.jpg')] bg-cover bg-center rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {id ? 'Update Menu Item' : 'Add Menu Item'}
                </h1>

                <Formik
                enableReinitialize

                    initialValues={{
                        name:data?.OneProduct?.name || "",
                        price: data?.OneProduct?.price || "",
                        Quantity:data?.OneProduct?.Quantity || "",
                        ImageLink:data?.OneProduct?.ImageLink || "",
                        dis:data?.OneProduct?.dis || ""
                    }}
                    onSubmit={(value) => {
                        handlesubmit(value);
                    }}
                    className="space-y-6 ">
                    <Form>
                        <div>
                            <label
                                htmlFor="productName"
                                className="block text-sm font-medium text-black mb-2"
                            >
                                Enter product name
                            </label>
                            <Field
                                type="text"
                                id="productName"
                                name="name"
                                placeholder="Product Name"
                                autoFocus
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition focus:bg-white"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-black mb-2"
                            >
                                Price
                            </label>
                            <Field
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                required
                                className="focus:bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="Quantity"
                                className="block text-sm font-medium text-black mb-2"
                            >
                                Quantity
                            </label>
                            <Field
                                type="text"
                                id="Quantity"
                                name="Quantity"
                                required
                                className="focus:bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="ImageLink"
                                className="block text-sm font-medium text-black mb-2"
                            >
                                ImageLink
                            </label>
                            <Field
                                type="text"
                                id="ImageLink"
                                name="ImageLink"
                                required
                                className="focus:bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="dis"
                                className="block text-sm font-medium text-black mb-2"
                            >
                                Describe your product
                            </label>
                            <Field
                                as='textarea'
                                type="text"
                                id="dis"
                                name="dis"
                                className="focus:bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/owner/menuitem')}
                                className="flex-1 py-3 px-4 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors"
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
                    </Form>
                </Formik>
            </div>
        </div>
    )
}