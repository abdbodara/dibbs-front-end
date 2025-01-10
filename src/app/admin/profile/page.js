"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "@/store/slices/profileSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Page() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.profile);
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    couponCode: "",
    couponAmount: "",
    supportEmail: "",
    refferal_credits: "",
    signupCredits: "",
    signupCreditsExpiry: "",
    productAdminShare: "",
    sendSignupEmail: "yes",
    profileImage: "",
    pwd: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await dispatch(getProfile()).unwrap();
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        user_name: data.userProfile?.fullName || "",
        email: data?.userProfile?.email || "",
        couponCode: data?.userProfile?.coupen_code,
        couponAmount: data?.userProfile?.coupen_amount,
        supportEmail: data?.userProfile?.support_email,
        refferal_credits: data?.userProfile?.referral_credits,
        signupCredits: data?.userProfile?.signup_credits,
        signupCreditsExpiry: data?.userProfile?.signup_credits_expiry,
        productAdminShare: data?.userProfile?.product_admin_share,
        sendSignupEmail: data?.userProfile?.send_signup_email,
        profileImage: data?.userProfile?.profile_image,
        pwd: data.userProfile?.pwd,
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profileImage" && formData[key] instanceof File) {
          submitFormData.append(key, formData[key]);
        } else {
          submitFormData.append(key, formData[key]);
        }
      });
      const result = await dispatch(updateProfile(submitFormData)).unwrap();
      if (result.status === 200) {
        toast.success(result?.data?.message);
      }
      dispatch(getProfile());
      router.push("/admin");
    } catch (error) {
      console.error("Failed to update profile:", error);
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
            className="xl:w-[966px] mx-auto w-full lg:w-auto"
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
              Coupen Code*
            </p>
            <input
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Coupen Code*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Coupen Amount (%)*
            </p>
            <input
              type="number"
              name="couponAmount"
              value={formData.couponAmount}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Coupen Amount (%)*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Support Email On*
            </p>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Support Email On*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Referral Credits*
            </p>
            <input
              type="number"
              name="refferal_credits"
              value={formData.refferal_credits}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Referral Credits*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              SignUp Credits*
            </p>
            <input
              type="number"
              name="signupCredits"
              value={formData.signupCredits}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="SignUp Credits*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              SignUp Credits Expiry*
            </p>
            <input
              type="date"
              name="signupCreditsExpiry"
              value={formData.signupCreditsExpiry}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="SignUp Credits Expiry*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Product Admin Share (%)*
            </p>
            <input
              type="number"
              name="productAdminShare"
              value={formData.productAdminShare}
              onChange={handleChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Product Admin Share (%)*"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Send SignUp Email*
            </p>
            <select
              name="sendSignupEmail"
              value={formData.sendSignupEmail}
              onChange={handleChange}
              style={{ width: "100%", height: "56px", padding: "0 10px" }}
            >
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>

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
                  {formData?.profileImage?.name || "Choose an image"}
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

            <hr className="my-4" />

            <button
              type="submit"
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
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
