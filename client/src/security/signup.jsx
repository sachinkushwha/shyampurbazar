import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import { BASE_URL } from "../config/config";

export const Signup = () => {
  const navigate = useNavigate();
  const signupFormdata = async (FormData) => {
    const res = await axios.post(`${BASE_URL}/signup`, FormData, {
      headers: { "Content-Type": "application/json" },
      withCredentials:true
    });
    return res.data;
  };

  const formdataMutaion = useMutation({
    mutationKey: ["formdata"],
    mutationFn: signupFormdata,
    onSuccess: (data) => {
      alert(data.message);
      navigate(`/login`);
    },
    onError: (err) => {
      if (err?.response?.status === 403) {
        alert(err?.response?.data?.message);
        navigate("/signup", { replace: true });
      } else if (err?.response?.status === 409) {
        alert(err?.response?.data?.message);
      }
    },
  });

  const handlesubmit = (value) => {
    formdataMutaion.mutate(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <Formik
          initialValues={{
            name: "",
            email: "",
            number: "",
            password: "",
          }}
          onSubmit={(value) => {
            handlesubmit(value);
          }}
        >
          <Form className="space-y-4">

            <h2 className="text-3xl font-bold text-center text-gray-800">
              Create Account
            </h2>

            {/* name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Name
              </label>
              <Field
                type="text"
                name="name"
                required
                autoFocus
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>


            {/* email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <Field
                type="email"
                name="email"
                required
                placeholder="example@gmail.com"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* mobile */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Mobile Number
              </label>
              <Field
                type="text"
                name="number"
                maxLength={10}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Set Password
              </label>

              <Field
                type="password"
                name="password"
                required
                placeholder="123abc@$&*"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>


            {/* button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Signup
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?
              <Link
                to={`/login`}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
};