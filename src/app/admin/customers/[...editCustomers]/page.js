"use client";

import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomer,
  updateCustomerReferelCredit,
} from "@/store/slices/customerSlice";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.customer);
  const currentPage = useSelector((state) => state.customer?.currentPage);

  const [formData, setFormData] = useState({
    user: "",
    referralCredits: "",
  });
  const customerId = params.editCustomers?.[0];
  useEffect(() => {
    dispatch(fetchCustomer(currentPage));
  }, [dispatch]);

  useEffect(() => {
    if (customerId && data?.data?.length > 0) {
      const customer = data?.data?.find(
        (cust) => cust.customer_id === parseInt(customerId)
      );
      if (customer) {
        setFormData({
          user: `${customer.first_name}`,
          referralCredits: customer.refferal_credits || "",
        });
      }
    }
  }, [customerId, data]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCustomerReferelCredit({
          customerId,
          refferal_credits: formData.referralCredits,
        })
      ).unwrap();
      await dispatch(fetchCustomer(currentPage));
      toast.success(`Customer ReferelCredit updated successfully!`);
      router.push("/admin/customers");
    } catch (error) {
      toast.error(error?.message || "Failed to update store customer.");
    }
  };
  return (
    <div>
      <h6 className="text-[30px] mb-[30px] font-[600]">Customers</h6>

      <div className=" w-full flex  p-[30px] shadow-custom bg-white rounded-md">
        <div className="w-full">
          <form
            className=" xl:w-[725px] mx-auto w-full lg:w-auto"
            onSubmit={handleSubmit}
          >
            <h4 className="mb-3  text-[#3d4465]">Update Customers</h4>
            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              User
            </p>
            <input
              type="text"
              value={formData.user}
              onChange={handleInputChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="User"
              required=""
            />

            <p className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]">
              Referral Credits
            </p>
            <input
              type="number"
              name="referralCredits"
              value={formData.referralCredits}
              onChange={handleInputChange}
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              placeholder="Referral Credits"
              required
            />

            <hr className="my-4" />
            <button
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
              type="submit"
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
