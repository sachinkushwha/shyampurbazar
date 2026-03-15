import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import { BASE_URL } from "../components/config";
import { useContext } from "react";
import { userContext } from "../Context Api/userManagment";
import { CompressImage } from "../utils/ImageCompresser";

export const Signup = () => {
  const { User, logingUser } = useContext(userContext);
  const { role } = useParams();
  const navigate = useNavigate();

  const becomeSeller = async (FormData) => {
    const response = await axios.post(`${BASE_URL}/bcoomeseller`, FormData, {
      headers: {
        authorization: User?.token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  const becomesellerMutaion = useMutation({
    mutationKey: ["becomeseller"],
    mutationFn: becomeSeller,
    onSuccess: (data) => {
      alert(data.message);
      const userdata = JSON.parse(localStorage.getItem("pepsiUserLoginData"));
      if (data.userrole) {
        userdata.role = data.userrole;
        logingUser(userdata);
        navigate("/owner");
      }
    },
    onError: (err) => {
      alert(err?.response?.data?.message);
    },
  });

  const handleBecomeseller = async(value) => {
    let Image=value.Image;
    if(value.Image){
      Image=await CompressImage(value.Image);
    }
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("Image", Image);
    formData.append("role", value.role);
    becomesellerMutaion.mutate(formData);
  };

  const signupFormdata = async (FormData) => {
    const res = await axios.post(`${BASE_URL}/signup`, FormData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  };

  const formdataMutaion = useMutation({
    mutationKey: ["formdata"],
    mutationFn: signupFormdata,
    onSuccess: (data) => {
      alert(data.message);
      navigate(`/login/${role}`);
    },
    onError: (err) => {
      if (err?.response?.status === 403) {
        alert(err?.response?.data?.message);
        navigate("/signup/user", { replace: true });
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
            Image: "",
            role: role,
          }}
          onSubmit={(value) => {
            role === "seller"
              ? handleBecomeseller(value)
              : handlesubmit(value);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">

              <h2 className="text-3xl font-bold text-center text-gray-800">
                {role === "seller"
                  ? "Ab Becho, Aur Kamao 🚀"
                  : "Create Account"}
              </h2>

              {/* name */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {role === "seller" ? "Store Name" : "Name"}
                </label>
                <Field
                  type="text"
                  name="name"
                  required
                  autoFocus
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {role !== "seller" ? (
                <>
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
                </>
              ) : (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Choose Store Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFieldValue("Image", e.target.files[0]);
                    }}
                    className="w-full mt-2 border rounded-lg p-2 cursor-pointer"
                  />
                </div>
              )}

              {role !== "seller" && (
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
              )}

              {/* button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {role === "seller" ? "Become a Seller" : "Signup"}
              </button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to={`/login/${role}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};