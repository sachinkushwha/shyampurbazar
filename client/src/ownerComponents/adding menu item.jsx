
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import PageLoader from "../components/PageLoader";
import { CompressImage } from "../utils/ImageCompresser";
export const AddingMenuItem = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const getOneMenuItem = async () => {
    if (!id) return null;
    const response = await axios.get(`${BASE_URL}/item/onemenuitem/${id}`, {
      withCredentials:true
    });
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['OneMenuItem', id],
    queryFn: getOneMenuItem,
  });
  const handlesubmitFormData = async (formdata) => {
    if (id) {
      
      try {
        const response = await axios.put(`${BASE_URL}/item/update/${id}`, formdata, { 

          headers: { 'Content-Type': 'multipart/form-data' } ,
          withCredentials:true
        });
        return response.data;
      } catch (err) {
        console.log('menu item update karne me error aaya hai', err);
      }
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/item/addmenuitem`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials:true
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
    const formdata = new FormData();
    formdata.append('name', value.name);
    formdata.append('price', value.price);
    formdata.append('Quantity', value.Quantity);
    if (value.Image) {
      formdata.append('Image', value.Image);
    }
    formdata.append('dis', value.dis);
    FormSubmitMutation.mutate(formdata)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {isLoading && <p>loading...</p>}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {id ? "Update Menu Item" : "Add Menu Item"}
        </h1>

        <Formik
          enableReinitialize
          initialValues={{
            name: data?.OneProduct?.name || "",
            price: data?.OneProduct?.price || "",
            Quantity: data?.OneProduct?.Quantity || "",
            Image: null,
            dis: data?.OneProduct?.dis || ""
          }}
          onSubmit={(value) => {
            handlesubmit(value);
          }}
        >

          {({ setFieldValue }) => (
            <>
              {FormSubmitMutation.isPending && (<PageLoader />)}
              <Form className="space-y-5">

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <Field
                    type="text"
                    name="Quantity"
                    placeholder="Enter quantity"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      const compressedImage = await CompressImage(file);
                      setFieldValue("Image", compressedImage);
                    }}
                    className="w-full border rounded-lg p-2 bg-gray-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="dis"
                    rows="3"
                    placeholder="Describe your product..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => navigate("/owner/menuitem")}
                    className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={FormSubmitMutation.isPending}
                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {id ? "Update Item" : "Add Item"}
                  </button>
                </div>

              </Form>
            </>
          )}
        </Formik>

      </div>
    </div>
  )
}