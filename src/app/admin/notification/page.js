"use client";
import Loader from "@/app/_componets/Loader";
import PushNotification from "@/app/_componets/tables/PushNotification";
import { setPageNumber } from "@/store/slices/customerSlice";
import { fetchPushNotification } from "@/store/slices/pushNotificationSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Page() {
  const [isopentoast, setisOpentoast] = useState(false);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const { data, loading, error } = useSelector(
    (state) => state.pushNotification
  );
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPushNotification(currentPage));
      } catch (error) {
        console.error("Failed to load pushNotification data:", error);
        toast.error("Failed to load pushNotification data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchPushNotification(pageNumber));
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
            <h6 className="text-[30px] font-[600]">Push Notification</h6>
            <button
              onClick={() => router.push("/admin/notification/addnew")}
              className="w-max flex items-center bg-sky  py-1 h-[41.52px] rounded-[30px] text-white text-[13px] duration-500 hover:bg-[#1593c9]"
            >
              <div className="w-[35px] bg-white rounded-full -ml-px grid place-content-center h-[35px] ">
                <FaPlus className="text-sky" />
              </div>
              <span className="mx-[12px]">New Push</span>
            </button>
          </div>
          <div>
            <PushNotification
              pushNotification={data}
              pagination={data?.pagination}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
