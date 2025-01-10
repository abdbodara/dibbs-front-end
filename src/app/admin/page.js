"use client";

import React, { useEffect } from "react";
import Images from "../_componets/Images";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "@/store/slices/dashboardSlice";
import { toast } from "react-toastify";

function Page() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDashboardData());
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast.error("Failed to load dashboard data.");
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600]">Dashboard</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1.875rem]">
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalDeals}
            </h1>
            <h6 className="text-[18px] text-grey">Total Deals</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Deals.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalPaidOrders}
            </h1>
            <h6 className="text-[18px] text-grey">Paid Orders</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Paid_Order.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalPendingOrders}
            </h1>
            <h6 className="text-[18px] text-grey">Pending Orders</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Pending Orders.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalFaqs}
            </h1>
            <h6 className="text-[18px] text-grey">Total Faqs</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Deals.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalCustomers}
            </h1>
            <h6 className="text-[18px] text-grey">Total Customers</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Deals.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
        <div className="p-[1.875rem] flex items-center justify-between rounded-[1.25rem] shadow-[0px_12px_23px_0px_#ac39d40a]">
          <div>
            <h1 className="text-[38px] mb-[8px] font-bold">
              {data?.totalCoupons}
            </h1>
            <h6 className="text-[18px] text-grey">Total Coupons</h6>
          </div>
          <div className="border-[1px] p-3 rounded-full ">
            <Images
              file={"svg"}
              name={"Deals.svg"}
              //  "Deals.svg"  || Pending Orders.svg
              classname={"w-[36px]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
