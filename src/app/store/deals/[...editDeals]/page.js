"use client";
import Tooltips from "@/app/_componets/Tooltips";
import { fetchCategories } from "@/store/slices/categorySlice";
import {
  clearImages,
  createProduct,
  fetchProductImages,
  fetchProducts,
  fetchProductVariants,
  searchImages,
  updateProduct,
} from "@/store/slices/dealSlice";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Page() {
  const params = useParams();
  const router = useRouter();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    data: products,
    searchImage,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  const { variants } = useSelector((state) => state.product);
  const { image } = useSelector((state) => state.product);

  const currentPage = useSelector((state) => state.customer?.currentPage || 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    owner_share: "",
    category: "",
    end_time: "",
    end_date_time: "",
    return_policy: "",
    purchase_valid: "180 Days",
    per_person_purchase: "",
    appointment: false,
    status: "",
  });

  const [variantDetails, setVariantDetails] = useState([
    {
      name: "",
      price: "",
      discount: "",
      image: "",
    },
  ]);

  const [errors, setErrors] = useState({
    product_nameError: "",
    descriptionError: "",
    endDateError: "",
    endTimeError: "",
  });

  const addVariantDetail = (e) => {
    e.preventDefault();
    setVariantDetails([
      ...variantDetails,
      {
        name: "",
        price: "",
        discount: "",
        image: null,
      },
    ]);
  };

  const dealsId = params.editDeals[1];
  useEffect(() => {
    if (searchImage?.length > 0) {
      setSelectedImages(searchImage);
    }
  }, [searchImage]);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchImages({ query: searchTerm, page: 1 }));
    } else {
      dispatch(clearImages());
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts(currentPage)).unwrap();
        await dispatch(fetchCategories(currentPage)).unwrap();
        if (dealsId) {
          await dispatch(fetchProductVariants(dealsId)).unwrap();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, dealsId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dealsId) {
          await dispatch(fetchProductImages(dealsId));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, dealsId]);

  useEffect(() => {
    if (dealsId && products?.data?.length > 0) {
      const deals = products?.data?.find((deal) => {
        return deal.product_id === parseInt(dealsId);
      });
      if (deals) {
        setFormData(deals);
      }
    }
  }, [dealsId, products]);

  useEffect(() => {
    if (dealsId && variants[dealsId]) {
      setVariantDetails(variants[dealsId] || []);
    }
  }, [dealsId, variants]);

  const handleDelete = async (imageToDelete) => {
    if (imageToDelete.auto_id) {
      setSelectedImages(
        selectedImages.filter(
          (image) => image.auto_id !== imageToDelete.auto_id
        )
      );
    } else {
      setSelectedImages(
        selectedImages.filter((image) => image !== imageToDelete)
      );
    }
  };

  const deleteOffer = (index) => {
    setVariantDetails((prevDetails) =>
      prevDetails.filter((_, i) => i !== index)
    );
  };

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(URL.createObjectURL(file));
    }
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(URL.createObjectURL(file));
    }
  };

  const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage3(URL.createObjectURL(file));
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!formData.end_date_time && !formData.end_time) {
      setFormData({
        ...formData,
        end_date_time: new Date(),
        end_time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${e.target.name}Error`]: "",
    }));
    console.log("🚀 ~ setErrors ~ e.target.name:", e.target.name);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variantDetails];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setVariantDetails(updatedVariants);
    const updatedErrors = { ...errors };
    if (field === "name" && value.trim()) {
      updatedErrors.variantErrors = updatedErrors.variantErrors || [];
      if (updatedErrors.variantErrors[index]) {
        delete updatedErrors.variantErrors[index].nameError;
      }
    }
    if (field === "price" && value) {
      updatedErrors.variantErrors = updatedErrors.variantErrors || [];
      if (updatedErrors.variantErrors[index]) {
        delete updatedErrors.variantErrors[index].priceError;
      }
    }
    setErrors(updatedErrors);
  };

  const handleImageSelect = async (image) => {
    const imageUrl = image.urls.small;
    setSelectedImages((prevImages) => {
      if (!prevImages.includes(imageUrl)) {
        return [...prevImages, imageUrl];
      }
      return prevImages;
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      imageError: "",
    }));
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.product_name) {
      newErrors.product_nameError = "Product name is required.";
    }

    if (!formData.description) {
      newErrors.descriptionError = "Description is required.";
    }

    if (
      !formData.end_date_time ||
      isNaN(new Date(formData.end_date_time).getTime())
    ) {
      newErrors.endDateError =
        "End date is required and should be a valid date.";
    }

    if (!formData.end_time) {
      newErrors.endTimeError = "End time is required.";
    }

    const variantErrors = variantDetails.map((variant, index) => {
      const errors = {};
      if (!variant.name) {
        errors.nameError = "Variant name is required.";
      }
      if (!variant.price) {
        errors.priceError = "Variant price is required.";
      }
      return errors;
    });

    const hasVariantErrors = variantErrors.some(
      (error) => Object.keys(error).length > 0
    );

    if (hasVariantErrors) {
      newErrors.variantErrors = variantErrors;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      product_nameError: "",
      descriptionError: "",
      endDateError: "",
      endTimeError: "",
      variantErrors: [],
    });

    setErrors({
      formDataError: "",
      variantDetailsError: "",
    });

    const productData = {
      ...formData,
      status: formData.status.toLowerCase(),
      uploadedImages: selectedImages,
    };
    const variationsData = [...variantDetails];
    console.log("🚀 ~ handleSubmit ~ variationsData:", variationsData);
    try {
      if (dealsId) {
        await dispatch(
          updateProduct({ productId: dealsId, productData, variationsData })
        );
        setSelectedImages([]);
        toast.success("Product and variants updated successfully!");
      } else {
        await dispatch(createProduct({ productData, variationsData }));
        setSelectedImages([]);
        toast.success("Product and variants created successfully!");
      }
      router.push("/store/deals/alldeals");
    } catch (error) {
      console.error("Error occurred while submitting", error);
    }
  };
  const openModal = () => {
    const date = formData?.end_date_time
      ? new Date(formData?.end_date_time)
      : null;
    setSelectedDate(date);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>
        <h6 className="text-[30px] font-[600]">My Store Deals</h6>

        <div className="bg-white flex 2xl:flex-row gap-4 flex-col my-5 w-full rounded-2xl px-6 py-4 shadow-custom">
          <div className="2xl:w-[900px] w-full">
            <h4 className="mb-3 text-[#3d4465] text-xl">Deal Information </h4>
            <form id="cumbinform" className="">
              <p
                className="text-grey flex items-center text-[16px] capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Give Your Deal A Title{" "}
                <span className="text-red-500 ml-1">*</span>
                <Tooltips
                  title={
                    "Your title will be shown on your deals “About” section where customers will be able to learn more about what your deal consist of. For example, if your offering a car detailing deal your title can be Car Detailing. If you’re offering a lunch deal your title can be whatever your restaurant serves such as Sushi Lunch Deal."
                  }
                />
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="product_name"
                id="caption"
                value={formData.product_name}
                onChange={(e) => handleInputChange(e)}
                placeholder="Product Name"
                required
              />
              {errors.product_nameError && (
                <p style={{ color: "red" }}>{errors.product_nameError}</p>
              )}

              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Deal Description <span className="text-red-500 ml-1">*</span>
              </p>
              <textarea
                type="text"
                className="border-[1px]  w-full border-[rgb(240,241,245)] min-h-[150px] focus:outline-none p-[6px_12px]"
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
                placeholder="Description Here  "
                required=""
              />
              {errors.descriptionError && (
                <p style={{ color: "red" }}>{errors.descriptionError}</p>
              )}

              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Select Category
              </p>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border-[1px] w-full mt-3 bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.data?.map((category, index) => (
                  <option key={category.id || index} value={category.auto_id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <p
                className="text-grey flex items-center text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Deal End Date<span className="text-red-500">*</span>
                <Tooltips
                  title={
                    "Please enter the last day and time you want your deal to show up live on the app for customers to see. You can always update this section."
                  }
                />
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="end_date_time"
                id="caption"
                placeholder="Product End Date"
                required
                value={
                  formData?.end_date_time
                    ? new Date(formData?.end_date_time)
                        .toISOString()
                        .split("T")[0]
                    : "N/A"
                }
                onClick={openModal}
                readOnly
              />
              {errors.endDateError && (
                <p style={{ color: "red" }}>{errors.endDateError}</p>
              )}

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-[9999999]"
                  onClose={closeModal}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white align-middle transition-all">
                          <div className="mt-4">
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date);
                                setFormData({
                                  ...formData,
                                  end_date_time: date
                                    ? date.toISOString()
                                    : null,
                                });
                                closeModal();
                              }}
                              inline
                              dateFormat="yyyy-MM-dd"
                              minDate={new Date()}
                            />
                            {errors.endTimeError && (
                              <p style={{ color: "red" }}>
                                {errors.endTimeError}
                              </p>
                            )}
                          </div>

                          <div className="my-4 flex justify-between px-4 space-x-2">
                            <button
                              type="button"
                              className="inline-flex justify-center w-full border border-transparent bg-[#a8def6] px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => {
                                const today = new Date();
                                setSelectedDate(today);
                                setFormData({
                                  ...formData,
                                  end_date_time: today.toISOString(),
                                });
                              }}
                            >
                              Today
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full  border border-transparent hover:bg-[#a8def6] px-4 py-2 text-sm font-medium text-black hover:text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => {
                                setSelectedDate(null);
                                setFormData({
                                  ...formData,
                                  end_date_time: null,
                                });
                              }}
                            >
                              Clear
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full  border border-transparent hover:bg-[#a8def6]  px-4 py-2 text-sm font-medium text-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Deal End Time<span className="text-red-500">*</span>
              </p>
              <input
                type="time"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="end_time"
                id="caption"
                onChange={(e) => handleInputChange(e)}
                placeholder="Deal End Time"
                required=""
                value={formData?.end_time}
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Return Policy
              </p>
              <textarea
                type="text"
                className="border-[1px]  w-full border-[#f0f1f5] min-h-[150px] focus:outline-none p-[6px_12px]"
                name="return_policy"
                id="caption"
                onChange={(e) => handleInputChange(e)}
                value={formData.return_policy}
                placeholder="Does your business have a return policy or satisfaction policy. If neither is applicable you can leave this section blank. "
                required=""
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize flex items-center font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Offer Valid After Purchase
                <Tooltips
                  title={
                    "Let your customers know how many days they have to claim their deal once they get it on the app. The amount of days you input below will be shown in the about section of your offer."
                  }
                />
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="purchase_valid"
                id="caption"
                onChange={(e) => handleInputChange(e)}
                placeholder="Ex:- 90 Days"
                required=""
                value={formData.purchase_valid}
              />
              <p
                className="text-grey  flex items-center text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Purchase Per Person
                <Tooltips
                  title={
                    "How many times is one person allowed to buy your offer(s)? "
                  }
                />
              </p>
              <input
                type="number"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="per_person_purchase"
                id="caption"
                placeholder="1 per Person"
                onChange={(e) => handleInputChange(e)}
                required=""
                value={formData?.per_person_purchase}
              />
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  name="caption"
                  id="caption"
                  placeholder="valid after purchase"
                  required=""
                  onChange={() =>
                    setFormData({
                      ...formData,
                      appointment: formData.appointment === "Y" ? "N" : "Y",
                    })
                  }
                  checked={formData?.appointment === "Y"}
                />
                <p className="text-grey text-[16px] flex items-center capitalize font-[400] ">
                  Appointment / Reservation Required
                  <Tooltips
                    title={
                      "Does your business require your customers to set an appointment or reservation before they arrive? If yes, check the box. "
                    }
                  />
                </p>
              </div>

              <p className="text-grey text-[16px] capitalize font-[400] my-3">
                Add a picture(s) that shows what your Deal is all about. We
                recommend a 850px width x 600px height so it looks perfect on
                the app!
              </p>

              <div className="relative">
                <p
                  className="text-grey flex items-center text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                  htmlFor="caption"
                >
                  Search Image
                  <Tooltips
                    title={
                      "Don’t have your own images to upload? Search our database and add a picture that represents your offer."
                    }
                  />
                </p>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                  placeholder="Keyword to search images and click the image to select"
                  required=""
                />

                {image.length > 0 && (
                  <div className="image-gallery shadow-md grid grid-cols-4 p-4 border-[1px] w-full border-[#f0f1f5]  gap-3 absolute top-[6rem] z-[999] bg-white">
                    {image.length > 0
                      ? image.map((image) => (
                          <div
                            key={image.id}
                            className="image-item max-h-[200px]"
                            onClick={() => handleImageSelect(image)}
                          >
                            <img
                              src={image.urls.small}
                              alt={image.alt_description}
                              className="h-[100px] w-[100px] object-contain hover:scale-105"
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                )}
              </div>
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Upload Image
              </p>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange1}
                  className=""
                />
                {selectedImage1 && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={selectedImage1}
                      alt="Selected"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange2}
                  className="my-3"
                />
                {selectedImage2 && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={selectedImage2}
                      alt="Selected"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange3}
                  className=""
                />
                {selectedImage3 && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={selectedImage3}
                      alt="Selected"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
              <p className="text-grey flex items-center text-[16px] mt-3 capitalize font-[400] mb-[8px]">
                Deal Status
                <Tooltips
                  title={
                    "You can toggle your deal to Active which will make it visible to customers or you can change it to Inactive If you don’t want it to be visible. "
                  }
                />
              </p>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="border-[1px] w-full mt-3 bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              >
                <option value="" disabled>
                  Submit Deal For Approval
                </option>
                <option
                  value={"Inactive"}
                  name="Inactive"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  Inactive
                </option>
                <option
                  value={"active"}
                  name="active"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  Active
                </option>
              </select>
              <div className="my-4 p-4 gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {selectedImages.length > 0 &&
                  selectedImages?.map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-44 relative group rounded-xl overflow-hidden"
                    >
                      <img
                        key={index}
                        src={item.image || item}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span
                        onClick={() => handleDelete(item)}
                        className="absolute group-hover:grid hidden w-10 h-10 place-content-center top-0 right-0 text-white text-xl bg-black/50 px-2 rounded-full m-2 cursor-pointer"
                      >
                        <MdClose />
                      </span>
                    </div>
                  ))}
              </div>
            </form>
          </div>
          <div className="flex-1 w-full my-3">
            <div className="flex items-center justify-between">
              <h4 className="mb-3 text-[#89879f] text-xl">Your Offers</h4>
              <Tooltips
                title={
                  "In this section, you’ll be able to list your Offer Title that applies to your Deal title that you previously filled in. Your Offer Title will be the first thing customers see on the app along with any pictures you add and will play a big role if customers decide to click on your offer to claim it, so make it count! Example: Your Deal Title is Car Detailing. One of your Offer Titles can be: One Full Exterior Car Wash while another can be One Full Exterior & Interior Car Wash giving your customers choices. You can add one or as many different offers as you’d like and once a customer clicks on your offer page they’ll be able to see all the different offers that you have listed."
                }
              />
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-sky text-white text-[18px]">
                {variantDetails.length}
              </span>
            </div>
            <div>
              {variantDetails.map((detail, index) => (
                <form key={detail.auto_id} id="secondform">
                  <div className="border-[#f0f1f5] mt-5  border-2 rounded-xl p-[10px]">
                    {index > 0 && (
                      <div
                        onClick={() => deleteOffer(index)}
                        className="bg-[#ff0808] cursor-pointer w-max border-[#fa0000] hover:bg-[#ff0808bd] rounded-full p-[6px_16px] text-white text-[13px]"
                      >
                        Delete This Offer
                      </div>
                    )}

                    <p
                      className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]"
                      htmlFor="caption"
                    >
                      Offer Title<span className="text-red-500 ml-1">*</span>
                    </p>
                    <input
                      type="text"
                      className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      placeholder="Enter Offer name"
                      required=""
                      value={detail.name}
                    />
                    {errors.variantErrors?.[index]?.nameError && (
                      <span className="text-red-500">
                        {errors.variantErrors[index].nameError}
                      </span>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p
                          className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]"
                          htmlFor="caption"
                        >
                          Offer Price
                          <span className="text-red-500 ml-1">*</span>
                        </p>
                        <div className="flex items-center">
                          <span className="p-[6px_12px] font-[400] flex text-[#495057] text-[14px] items-center justify-center w-[56px] h-[56px] bg-[#d7dae3]">
                            $
                          </span>
                          <input
                            type="number"
                            className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                            value={detail.price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            placeholder="Enter Price"
                            required=""
                          />
                          {errors.variantErrors?.[index]?.priceError && (
                            <span className="text-red-500">
                              {errors.variantErrors[index].priceError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p
                          className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]"
                          htmlFor="caption"
                        >
                          Discount
                        </p>
                        <div className="flex items-center">
                          <span className="p-[6px_12px] flex text-[#495057] font-[400] text-[14px] items-center justify-center w-[56px] h-[56px] bg-[#d7dae3]">
                            $
                          </span>
                          <input
                            type="number"
                            className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                            value={detail.discount}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "discount",
                                e.target.value
                              )
                            }
                            id="caption"
                            placeholder="Enter Discount"
                            required=""
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]">
                      List the original price of your offer and add the discount
                      you will apply to it. For example: If your offer cost $100
                      and you want to give a discount of $10, customers will see
                      it available for 10% off at $90 on the app.
                    </p>
                  </div>
                </form>
              ))}
              <div className="flex items-center gap-2">
                <button
                  className="bg-sky px-4  capitalize p-[0.938rem_.5rem] text-[1rem] rounded-3xl text-white"
                  onClick={(e) => addVariantDetail(e)}
                >
                  Add New Offer
                </button>
                <Tooltips
                  title={
                    "Have a 2nd offer that you want to add? Click “Add New Offer” to add another offer that relates to your deal. For example. If your first offer is Wine Tasting for 2. Your second offer can be Wine Tasting for 4. Customers will be able to see this 2nd offer on the app whenever they click on your deal."
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
          type="submit"
          onClick={handleSubmit}
        >
          Add/Update Deal
        </button>
      </div>
    </>
  );
}

export default Page;
