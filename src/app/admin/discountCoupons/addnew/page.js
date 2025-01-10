"use client";

import {
  createCoupon,
  fetchDiscountCoupon,
} from "@/store/slices/discountCoupon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const router = useRouter();
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createCoupon(coupon));
      toast.success("Coupon Created successfully!");
      await dispatch(fetchDiscountCoupon(currentPage));
      router.push("/admin/discountCoupons");
    } catch (error) {
      console.error("Error during coupon creation:", error);
    }
  };

  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600] mb-[25px]">Discount Coupons</h6>
      <div className="shadow-custom w-full flex bg-white my-16  p-[30px]">
        <div className="mx-auto w-full lg:w-auto">
          <h4 className="mb-3 text-[#3d4465]">Add/Update Coupon Code</h4>
          <form className="w-full xl:w-[725px]">
            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Coupon Code
            </p>
            <input
              type="text"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="code"
              id="code"
              placeholder="Coupon Code"
              value={coupon.code}
              onChange={handleChange}
              required=""
            />
            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Discount (%)
            </p>
            <input
              type="number"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="discount"
              id="discount"
              placeholder="Discount in (%)"
              value={coupon.discount}
              onChange={handleChange}
            />

            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Email
            </p>
            <input
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="email"
              id="email"
              placeholder="Customer Email"
              value={coupon.email}
              onChange={handleChange}
              required=""
            />

            <hr className="my-4" />
            <button
              onClick={handleSubmit}
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
              type="submit"
            >
              Add/Update Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
