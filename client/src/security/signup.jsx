import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
export const Signup = () => {
    const { role } = useParams();
    const navigate = useNavigate();


    const signupFormdata = async (FormData) => {
        const res = await axios.post('http://localhost:3000/signup', FormData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    }
    const formdataMutaion = useMutation({
        mutationKey: ['formdata'],
        mutationFn: signupFormdata,
        onSuccess: (data) => {
            alert(data.message);
            navigate(`/login/${role}`)
        },
        onError: (err) => {
            alert(err)
        }
    });

    const handlesubmit = (value) => {
        formdataMutaion.mutate(value)
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        role: role
                    }}
                    onSubmit={(value) => {
                        handlesubmit(value)
                    }}
                    className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
                >
                    <Form>
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                           {role==='seller'?'Upgrade to Seller':'Create Account'}
                        </h2>

                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            {role === 'seller' ? 'Store Name' : 'Name'}
                        </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            autoFocus
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {
                            role !== 'seller' ? (<>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Enter Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                /></>
                            ):''
                      }


                        {
                            role!=='seller'?(
                                <>
                                <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Set Password
                        </label>
                        <Field
                            type="password"
                            name="password"
                            id="password"

                            placeholder="123abc@$&*"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                                </>
                            ):''
                        }
                        

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                        <p className="mt-5">if already have account <Link to="/login" className="text-blue-500 cursor-pointer">login</Link></p>
                    </Form>
                </Formik>

            </div>
        </>
    );
};
