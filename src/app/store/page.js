"use client";

import React, { useEffect } from "react";
import Images from "../_componets/Images";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreDashboardData } from "@/store/slices/dashboardSlice";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

function Page() {
  const dispatch = useDispatch();
  const { storeData } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken");
        if (token) {
          const decodedToken = jwt.decode(token);
          const userId = decodedToken.id;
          await dispatch(fetchStoreDashboardData(userId));
        }
      } catch (error) {
        console.log("Failed to load store dashboard data:", error);
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
              {storeData?.totalDeals ? storeData?.totalDeals : 0}
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
              {storeData?.totalPaidOrders}
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
              {storeData?.totalPendingOrders}
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
      </div>
    </div>
  );
}

export default Page;
