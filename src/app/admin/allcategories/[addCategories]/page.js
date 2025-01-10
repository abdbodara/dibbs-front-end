"use client";
import {
  addCategory,
  fetchCategories,
  updateCategory,
} from "@/store/slices/categorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";


function Page() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const categoriesId = params.addCategories;
  const { data, loading, error } = useSelector((state) => state.categories);
  const currentPage = useSelector((state) => state.customer?.currentPage);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    try {
      dispatch(fetchCategories(currentPage));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (categoriesId && data?.data?.length > 0) {
      const customer = data?.data?.find(
        (cust) => cust.auto_id === parseInt(categoriesId)
      );
      if (customer) {
        setFormData({
          name: customer.name,
          description: customer.description,
          image: customer.image || null,
          imagePreview: customer.image || null,
        });
      }
    }
  }, [categoriesId, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevState) => ({
        ...prevState,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (categoriesId) {
        await dispatch(
          updateCategory({
            categoryId: categoriesId,
            name: formData.name,
            description: formData.description,
            image: formData.image,
          })
        ).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await dispatch(
          addCategory({
            name: formData.name,
            description: formData.description,
            image: formData.image,
          })
        ).unwrap();
        toast.success("Category added successfully!");
      }

      setFormData({ name: "", description: "", image: null });
      router.push("/admin/allcategories");
    } catch (error) {
      toast.error(error?.message || "Failed to add category");
    }
  };

  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600] mb-[25px]">Categories</h6>
      <div className="shadow-custom w-full flex  p-[30px]">
        <div className="mx-auto w-full lg:w-auto">
          <h4 className="mb-3 text-[#3d4465]">Add / Update Category</h4>
          <form className="w-full xl:w-[725px]">
            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Category Name
            </p>
            <input
              type="text"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Category Name"
              required=""
            />

            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Category Description
            </p>
            <textarea
              type="text"
              className="border-[1px]  w-full border-[#f0f1f5] min-h-[150px] focus:outline-none p-[6px_12px]"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description Here  "
              required=""
            />

            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Image
            </p>
            <div>
              <input
                type="file"
                className=""
                onChange={handleFileChange}
                placeholder=""
              />
              {formData?.imagePreview && (
                <div className="mt-4">
                  <img
                    src={
                      formData.imagePreview.startsWith("blob:")
                        ? formData.imagePreview
                        : `https://dibbs-back-end.onrender.com/${formData.image}`
                    }
                    alt=""
                    className="max-h-[200px] object-cover"
                  />
                </div>
              )}
            </div>

            <hr className="my-4" />
            <button
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Add/Update Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
