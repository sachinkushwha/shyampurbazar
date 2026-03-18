// AddAddressForm.jsx
import { Formik, Form, Field } from "formik";
import axios from 'axios'
import { BASE_URL } from "../config/config";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const AddAddressForm = () => {
    const navigate=useNavigate();
    const { User } = useContext(userContext)
    const addAdress = async (formData) => {
        const response = await axios.post(`${BASE_URL}/addaddress`, formData, {
            headers: {
                'authorization': User?.token
            }
        });
        return response.data;
    }

    const addAdressMutation=useMutation({
        mutationFn:addAdress,
        onSuccess:(data)=>{
            alert(data.message);
            navigate('/placeorder')
        }
    })

    const handleSave = (formdata) => {
        console.log(formdata,'address form')
        addAdressMutation.mutate(formdata);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <Formik
                initialValues={{
                    village:'',
                    street: '',
                    landmark:'',
                    city: '',
                    pin: ''
                }}
                onSubmit={(value, { resetForm }) => {
                    handleSave(value),
                        resetForm();
                }}
            >
                <Form>
                    <Field
                        type="text"
                        placeholder="Village"
                        name='village'
                        className="w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                    <Field
                        type="text"
                        placeholder="Street / Area"
                        name='street'
                        className="w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                    <Field
                        type="text"
                        placeholder="landmark"
                        name='landmark'
                        className="w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                    <Field
                        type="text"
                        placeholder="City"
                        name='city'
                        className="w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                    <Field
                        type="text"
                        placeholder="Pin Code"
                        name='pin'
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Save Address
                        </button>
                    </div>
                </Form>
            </Formik>
        </div >
    );
};