"use client";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import SupportQueriesTable from "@/app/_componets/tables/SupportQueriesTable";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchSupportQueries,
  updateSupportStatus,
} from "@/store/slices/supportQueriesSlice";
import { setPageNumber } from "@/store/slices/customerSlice";
import { toast } from "react-toastify";
import Loader from "@/app/_componets/Loader";

function Page() {
  const [isopentoast, setisOpentoast] = useState(false);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.supportQueries);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSupportQueries(currentPage));
      } catch (error) {
        console.error("Failed to load support queries data:", error);
        toast.error("Failed to load support queries data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchSupportQueries(pageNumber));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(
        `Failed to load support queries for page ${pageNumber}:`,
        error
      );
      toast.error("Failed to load support queries for the selected page.");
    }
  };
  const handleDoneClick = async (support_id) => {
    try {
      dispatch(updateSupportStatus({ support_id, status: "done" }));
      await dispatch(fetchSupportQueries(currentPage));
    } catch (error) {
      toast.error(error?.message || "Failed to update support queries status.");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <h6 className="text-[30px] font-[600]">Support Queries</h6>
          <div>
            <TableContent
              title={`Queries (${
                data.pagination?.totalRecords
                  ? data.pagination?.totalRecords
                  : 0
              })`}
              subtitle={"Support Queries from website"}
            >
              <SupportQueriesTable
                handleDoneClick={handleDoneClick}
                supportQueries={data}
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
