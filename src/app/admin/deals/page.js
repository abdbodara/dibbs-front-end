"use client";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import PendingDealsTable from "@/app/_componets/tables/PendingDealsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingDeals } from "@/store/slices/dealSlice";
import { toast } from "react-toastify";
import { setPageNumber } from "@/store/slices/customerSlice";
import Loader from "@/app/_componets/Loader";

function Page() {
  const [isopentoast, setisOpentoast] = useState(false);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchPendingDeals({ page: currentPage, searchTerm: "" })
        );
        toast.success("Pending product data loaded successfully!");
      } catch (error) {
        console.error("Failed to load pending product data:", error);
        toast.error("Failed to load pending product data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchPendingDeals({ page: pageNumber, searchTerm: "" }));
      await dispatch(setPageNumber(pageNumber));
      toast.success(`Pending product loaded for page ${pageNumber}`);
    } catch (error) {
      console.error(
        `Failed to load pending product for page ${pageNumber}:`,
        error
      );
      toast.error("Failed to load pending product for the selected page.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(
        fetchPendingDeals({ page: currentPage, searchTerm: searchTerm })
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <h6 className="text-[30px] font-[600]">Pending Deals</h6>
          <div>
            <TableContent
              title={`Pending Deals (${
                data?.pagination?.totalRecords
                  ? data?.pagination?.totalRecords
                  : 0
              })`}
              subtitle={"All of Pending Deals List"}
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
              searchTerm={searchTerm}
            >
              <PendingDealsTable
                products={data}
                pagination={data.pagination}
                onPageChange={handlePageChange}
                setisOpentoast={setisOpentoast}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
