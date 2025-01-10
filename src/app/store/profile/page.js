"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreProfile } from "@/store/slices/profileSlice";
import { updateStoreProfile } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Page() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);
  const { storeProfileData } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    profileImage: "",
    store_name: "",
    storeLogo: "",
    pwd: "",
    redeem_code: "",
    address: "",
    phone: "",
    website: "",
    address: "",
    newPassword: "",
    businessHours: {},
  });
  
  const [redeemCodeError, setRedeemCodeError] = useState("");
  const router = useRouter();
  const [checkedDays, setCheckedDays] = useState({});

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await dispatch(getStoreProfile()).unwrap();
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  useEffect(() => {
    if (storeProfileData) {
      setFormData((prev) => ({
        ...prev,
        user_name: storeProfileData.user?.user_name || "",
        email: storeProfileData.user?.email || "",
        profileImage: storeProfileData.user?.profile_image || "",
        store_name: storeProfileData.store_name || "",
        pwd: storeProfileData.user?.pwd,
        redeem_code: storeProfileData.redeem_code || "",
        phone: storeProfileData.phone || "",
        website: storeProfileData.website || "",
        storeLogo: storeProfileData.store_logo || "",
        address: storeProfileData.address || "",
        businessHours: storeProfileData.businessHours || {},
      }));
    }
  }, [storeProfileData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "redeem_code") {
      const redeemCodePattern = /^[0-9]{4,6}$/;
      if (!redeemCodePattern.test(value)) {
        setRedeemCodeError(
          "Create a 4-6 digit redeem code to enter on your customers phone when they’re ready to redeem their deal."
        );
      } else {
        setRedeemCodeError("");
      }
    }

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (day) => {
    setCheckedDays((prev) => {
      const newCheckedDays = { ...prev, [day]: !prev[day] };
      if (!newCheckedDays[day]) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          businessHours: {
            ...prevFormData.businessHours,
            [day]: { start: "", end: "" },
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          businessHours: {
            ...prevFormData.businessHours,
            [day]: undefined,
          },
        }));
      }
      return newCheckedDays;
    });
  };

  const handleTimeChange = (day, timeType, value) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...(prev.businessHours[day] || {}),
          [timeType]: value,
        },
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "profileImage" && formData[key] instanceof File) {
          form.append(key, formData[key]);
        } else {
          form.append(key, formData[key]);
        }
      });

      const result = await dispatch(updateStoreProfile(form)).unwrap();
      if (result.status === 200) {
        toast.success(result?.data?.message);
      }
      dispatch(getStoreProfile());
      router.push("/store");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <h6 className="text-[30px] font-[600] mb-3">My Profile</h6>
      <h4 className="mb-[25px] text-sky">Dashboard / Update Profile</h4>

      <div className="w-full flex p-[30px] shadow-custom bg-white rounded-md">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="xl:max-w-[966px] mx-auto w-full lg:w-auto"
          >
            <h4 className="mb-3 text-[#3d4465]">Personal Information</h4>
            <p className="text-grey text-[16px] capitalize font-[400] mb-[8px]">
              Full Name*
            </p>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Full Name*"
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Email*
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Email"
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Profile Image
            </p>
            <div className="relative border border-[#f0f1f5] rounded">
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center justify-between h-[56px]">
                <p className="flex-1 px-5 truncate">
                  {formData.profileImage?.name || "Choose an image"}
                </p>
                <div className="bg-[#656c73] px-4 h-full flex items-center text-white">
                  Browse
                </div>
              </div>
              {formData.profileImage && (
                <div className="p-2 border-t border-[#f0f1f5]">
                  <img
                    src={
                      typeof formData.profileImage === "string"
                        ? `https://dibbs-back-end.onrender.com/${formData.profileImage}`
                        : URL.createObjectURL(formData.profileImage)
                    }
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Store Name*
            </p>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Store Name*"
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Store Redeem Code*
            </p>
            <input
              type="text"
              name="redeem_code"
              value={formData.redeem_code}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Store Redeem Code*"
              required=""
            />
            {/* <p className="text-sm text-red-500">
              Create a 4-6 digit redeem code to enter on your customers phone
              when they’re ready to redeem their deal.
            </p> */}
            {redeemCodeError && (
              <p className="text-sm text-red-500">{redeemCodeError}</p>
            )}
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Phone #
            </p>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="987...."
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Website
            </p>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder=""
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Business Address *
            </p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Address"
              required=""
            />
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Store Logo
            </p>
            <div className="relative border border-[#f0f1f5] rounded">
              <input
                type="file"
                name="storeLogo"
                onChange={handleChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center justify-between h-[56px]">
                <p className="flex-1 px-5 truncate">
                  {formData.storeLogo?.name || "Choose an image"}
                </p>
                <div className="bg-[#656c73] px-4 h-full flex items-center text-white">
                  Browse
                </div>
              </div>
              {formData.storeLogo && (
                <div className="p-2 border-t border-[#f0f1f5]">
                  <img
                    src={
                      typeof formData.storeLogo === "string"
                        ? `https://dibbs-back-end.onrender.com/${formData.storeLogo}`
                        : URL.createObjectURL(formData.storeLogo)
                    }
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Business Hours
            </p>
            {daysOfWeek.map((day) => (
              <div className="flex items-center" key={day}>
                <div>
                  <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
                    {day}
                  </p>
                  <div className="flex items-center gap-2 w-[150px]">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(day)}
                      checked={checkedDays[day] || false}
                    />
                    <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
                      Closed
                    </p>
                  </div>
                </div>

                {!checkedDays[day] && (
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                      value={formData.businessHours[day]?.start || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "start", e.target.value)
                      }
                      placeholder="Product Start Time"
                      required=""
                    />
                    <input
                      type="time"
                      className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
                      value={formData.businessHours[day]?.end || ""}
                      onChange={(e) =>
                        handleTimeChange(day, "end", e.target.value)
                      }
                      placeholder="Product End Time"
                      required=""
                    />
                  </div>
                )}
              </div>
            ))}

            <p className="text-lg my-3 text-[#3d4465]">
              Want To Update Your Password? Do So Below
            </p>

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              New Password
            </p>
            <input
              type="text"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="New Password"
              required=""
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-sky w-full h-[61px] my-4 capitalize text-[18px] rounded-3xl text-white"
            >
              Update profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
