"use client";
import React, { useEffect } from "react";
import TableContent from "./TableContent";
import DiscountCoupons from "@/app/_componets/tables/DiscountCoupons";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { setPageNumber } from "@/store/slices/customerSlice";
import {
  DeleteDiscountCoupon,
  fetchDiscountCoupon,
} from "@/store/slices/discountCoupon";
import Loader from "@/app/_componets/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Page() {
  const router = useRouter();
  const { data, loading, error } = useSelector(
    (state) => state.discountCoupons
  );
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDiscountCoupon(currentPage));
      } catch (error) {
        console.error("Failed to load discount coupon data:", error);
        toast.error("Failed to load discount coupon data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchDiscountCoupon(pageNumber));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(
        `Failed to load discount coupon for page ${pageNumber}:`,
        error
      );
      toast.error("Failed to load discount coupon for the selected page.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(DeleteDiscountCoupon(id)).unwrap();
      await dispatch(fetchDiscountCoupon(currentPage));
    } catch (error) {
      toast.error(error?.message || "Failed to update store status.");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="flex items-center justify-between">
            <h6 className="text-[30px] font-[600]">Discount Coupons</h6>
            <button
              onClick={() => router.push("/admin/discountCoupons/addnew")}
              className="w-max flex items-center bg-sky  py-1 h-[41.52px] rounded-[30px] text-white text-[13px] duration-500 hover:bg-[#1593c9]"
            >
              <div className="w-[35px] bg-white rounded-full -ml-px grid place-content-center h-[35px] ">
                <FaPlus className="text-sky" />
              </div>
              <span className="mx-[12px]">New Coupons</span>
            </button>
          </div>
          <div>
            <TableContent
              title={`Coupons (${
                data.pagination?.totalRecords
                  ? data.pagination?.totalRecords
                  : 0
              })`}
              subtitle={"All Discount coupons for customers"}
            >
              <DiscountCoupons
                discountCoupons={data}
                pagination={data.pagination}
                onPageChange={handlePageChange}
                handleDelete={handleDelete}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
