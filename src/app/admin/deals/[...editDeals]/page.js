"use client";
import { fetchCategories } from "@/store/slices/categorySlice";
import {
  clearImages,
  deleteSearchImage,
  fetchProductImages,
  fetchProducts,
  fetchProductVariants,
  searchImages,
  updateProduct,
  uploadImageUrl,
} from "@/store/slices/dealSlice";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import Tooltips from "@/app/_componets/Tooltips";
function Page() {
  const router = useRouter();
  const params = useParams();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    data: products,
    image,
    searchImage,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);
  const { variants } = useSelector((state) => state.product);
  const currentPage = useSelector((state) => state.customer?.currentPage);
  const [searchTerm, setSearchTerm] = useState("");
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
    purchase_valid: "",
    per_person_purchase: "",
    appointment: false,
    status: "",
    selected_image: "",
  });
  const [variantDetails, setVariantDetails] = useState([
    {
      auto_id: 1,
      name: "",
      price: "",
      discount: "",
      tags: "",
      image: "",
    },
  ]);

  const addVariantDetail = (e) => {
    e.preventDefault();
    setVariantDetails([
      ...variantDetails,
      {
        id: Date.now(),
        name: "",
        price: "",
        discount: "",
        tags: "",
        image: null,
      },
    ]);
  };
  useEffect(() => {
    if (searchImage?.length > 0) {
      setSelectedImages(searchImage);
    }
  }, [searchImage]);
  const handleFileChange = (index, file) => {
    const updatedDetails = [...variantDetails];

    updatedDetails[index] = {
      ...updatedDetails[index],
      image: file,
    };

    setVariantDetails(updatedDetails);
  };

  const dealsId = params.editDeals[1];

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
        await dispatch(fetchCategories()).unwrap();
        if (dealsId) {
          await dispatch(fetchProductVariants(dealsId)).unwrap();
          await dispatch(fetchProductImages(dealsId));
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

  const deleteOffer = (index) => {
    setVariantDetails((prevDetails) =>
      prevDetails.filter((_, i) => i !== index)
    );
  };
  const [images, setImages] = useState([
    "https://images.pexels.com/photos/6334128/pexels-photo-6334128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/8718525/pexels-photo-8718525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/13738405/pexels-photo-13738405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ]);
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
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variantDetails];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setVariantDetails(updatedVariants);
  };
  const handleImageSelect = async (image) => {
    const imageUrl = image.urls.small;

    setSelectedImages((prevImages) => {
      if (!prevImages.includes(imageUrl)) {
        return [...prevImages, imageUrl];
      }
      return prevImages;
    });

    setSearchTerm("");
  };
  const handleSubmit = async () => {
    const productData = {
      ...formData,
      status: formData.status.toLowerCase(),
      uploadedImages: selectedImages,
    };
    const variationsData = [...variantDetails];
    try {
      await dispatch(
        updateProduct({ productId: dealsId, productData, variationsData })
      );
      toast.success("Product and variants updated successfully!");
      router.push("/admin/deals/alldeals");
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
        <h6 className="text-[30px] font-[600]">Products</h6>
        <div className="breadcrumb">
          <nav className="flex items-center space-x-2 text-gray-600">
            <p
              onClick={() => router.push("/admin/deals/alldeals")}
              className="text-black cursor-pointer "
            >
              All Products
            </p>
            <span>/</span>
            <p className="text-sky">Add/Update Product</p>
          </nav>
        </div>
        <div className="bg-white flex 2xl:flex-row gap-4 flex-col my-5 w-full rounded-2xl px-6 py-4 shadow-custom">
          <div className="2xl:w-[900px] w-full">
            <h4 className="mb-3 text-[#3d4465] text-xl">
              Product Information{" "}
            </h4>
            <form className="">
              <p
                className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Product Name<span className="text-red-500 ml-1">*</span>
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="product_name"
                id="caption"
                value={formData.product_name}
                onChange={(e) => handleInputChange(e)}
                placeholder="Product Name"
                required=""
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Product Description <span className="text-red-500 ml-1">*</span>
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
              <select className="border-[1px] w-full mt-3 bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]">
                <option
                  value={formData.category}
                  name="category"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  Select Category
                </option>
                {categories.data?.map((category, index) => (
                  <option key={category.id || index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Owner Share (In Percentage)
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="owner_share"
                id="caption"
                placeholder="owner_share Name"
                required=""
                onChange={(e) => handleInputChange(e)}
                value={formData?.owner_share}
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Product End Date<span className="text-red-500 ml-1">*</span>
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
                    ? new Date(formData?.end_date_time).toLocaleDateString(
                        "en-CA"
                      )
                    : "N/A"
                }
                onClick={openModal}
                readOnly
              />

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
                            />
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
                Product End Time <span className="text-red-500 ml-1">*</span>
              </p>
              <input
                type="time"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="end_time"
                id="caption"
                onChange={(e) => handleInputChange(e)}
                placeholder="Product End Time"
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
                placeholder="Return Policy if any... "
                required=""
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Purchase Validity
              </p>
              <input
                type="text"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="purchase_valid"
                id="caption"
                onChange={(e) => handleInputChange(e)}
                placeholder="valid after purchase"
                required=""
                value={formData.purchase_valid}
              />
              <p
                className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                htmlFor="caption"
              >
                Purchase Per Person
              </p>
              <input
                type="number"
                className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                name="per_person_purchase"
                id="caption"
                placeholder="valid after purchase"
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
                <p className="text-grey text-[16px] capitalize font-[400]">
                  Appointment / Reservation Required
                </p>
              </div>

              <select
                className="border-[1px] w-full mt-3 bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                value={formData?.status}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  });
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="delete">Delete</option>
              </select>
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
                {/* 
                <div className="image-gallery shadow-md grid grid-cols-4 p-4 border-[1px] w-full border-[#f0f1f5]  gap-3 absolute top-[6rem] z-[999] bg-white">
                  {image.length > 0 ? (
                    image.map((image) => (
                      <div key={image.id} className="image-item max-h-[200px]">
                        <img
                          src={image.urls.small}
                          alt={image.alt_description}
                          className="h-[100px] w-[100px] object-contain hover:scale-105"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-grey">No images found</p>
                  )}
                </div> */}
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
              <h4 className="mb-3 text-[#3d4465] text-xl">
                Products Variations
              </h4>
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-sky text-white text-[18px]">
                {variantDetails.length}
              </span>
            </div>
            <div>
              {variantDetails.map((detail, index) => (
                <form key={detail.auto_id}>
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
                      Variant Name
                    </p>
                    <input
                      type="text"
                      className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      placeholder="Variant Name *"
                      required=""
                      value={detail.name}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p
                          className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]"
                          htmlFor="caption"
                        >
                          Product Price
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
                          <span className="p-[6px_12px] font-[400] flex text-[#495057] text-[14px] items-center justify-center w-[56px] h-[56px] bg-[#d7dae3]">
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
                    <p
                      className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
                      htmlFor="caption"
                    >
                      Image
                    </p>
                    <div>
                      <input
                        type="file"
                        className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                        placeholder="choose file"
                        onChange={(e) =>
                          handleFileChange(index, e.target.files[0])
                        }
                      />
                    </div>
                    {detail.image && (
                      <div className="mt-3">
                        <img
                          src={
                            typeof detail.image === "string"
                              ? `https://dibbs-back-end.onrender.com/uploads/${detail.image}`
                              : URL.createObjectURL(detail.image)
                          }
                          alt="Variant Preview"
                          className="max-h-[200px] object-cover"
                        />
                      </div>
                    )}

                    <p
                      className="text-grey text-[16px] capitalize mt-3 font-[400] mb-[8px]"
                      htmlFor="caption"
                    >
                      Product Tags (Comma Separated)
                    </p>
                    <input
                      type="text"
                      className="border-[1px] w-full border-[#f0f1f5] mb-2 h-[56px] focus:outline-none p-[6px_12px]"
                      value={detail.tags}
                      onChange={(e) =>
                        handleVariantChange(index, "tags", e.target.value)
                      }
                      id="caption"
                      placeholder="Variant Tags"
                      required=""
                    />
                  </div>
                </form>
              ))}
              <button
                className="bg-sky px-4 h-[61px] capitalize text-[18px] rounded-3xl text-white"
                onClick={(e) => addVariantDetail(e)}
              >
                Add New Varient
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
          type="submit"
          onClick={handleSubmit}
        >
          Add/Update Category
        </button>
      </div>
    </>
  );
}

export default Page;
