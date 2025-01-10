"use client";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import { FaPlus } from "react-icons/fa6";
import FAQsTable from "@/app/_componets/tables/FAQsTable";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs } from "@/store/slices/faqslice";
import { setPageNumber } from "@/store/slices/customerSlice";
import { toast } from "react-toastify";
import Loader from "@/app/_componets/Loader";

function Page() {
  const [isopentoast, setisOpentoast] = useState(false);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.faqs);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchFaqs(currentPage));
      } catch (error) {
        console.error("Failed to load faqs data:", error);
        toast.error("Failed to load faqs data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchFaqs(pageNumber));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load faqs for page ${pageNumber}:`, error);
      toast.error("Failed to load faqs for the selected page.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="flex items-center justify-between">
            <h6 className="text-[30px] font-[600]">FAQs</h6>
            <button
              onClick={() => router.push("/admin/faqs/addnew")}
              className="w-max flex items-center bg-sky  py-1 h-[41.52px] rounded-[30px] text-white text-[13px] duration-500 hover:bg-[#1593c9]"
            >
              <div className="w-[35px] bg-white rounded-full -ml-px grid place-content-center h-[35px] ">
                <FaPlus className="text-sky" />
              </div>
              <span className="mx-[12px]">New FAQs</span>
            </button>
          </div>
          <div>
            <TableContent
              title={`FAQs (${
                data.pagination?.totalRecords
                  ? data.pagination?.totalRecords
                  : 0
              })`}
            >
              <FAQsTable
                faqs={data}
                pagination={data.pagination}
                onPageChange={handlePageChange}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
