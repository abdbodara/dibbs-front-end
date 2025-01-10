"use client";
import React from "react";

function page() {
  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600] mb-[25px]">Discount Coupons</h6>
      <div className="shadow-custom w-full flex  p-[30px]">
        <div className="mx-auto w-full lg:w-auto">
          <h4 className="mb-3 text-[#3d4465]">Add/Update Coupon Code </h4>
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
              placeholder="Coupon Code"
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
              placeholder="Discount (%)"
              required=""
            />

            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Email
            </p>
            <input
              type="number"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Email"
              required=""
            />

            <hr className="my-4" />
            <button
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
}

export default page;
