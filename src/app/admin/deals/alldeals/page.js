"use client";
import React, { useEffect, useState } from "react";
import PendingDealsTable from "@/app/_componets/tables/PendingDealsTable";
import TableContent from "../TableContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/dealSlice";
import Notification from "@/app/_componets/Notification";
import { toast } from "react-toastify";
import { setPageNumber } from "@/store/slices/customerSlice";
import Loader from "@/app/_componets/Loader";

function Page() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [isopentoast, setisOpentoast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts({ page: currentPage, searchTerm: "" }));
        toast.success("Product data loaded successfully!");
      } catch (error) {
        console.error("Failed to load product data:", error);
        toast.error("Failed to load product data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchProducts({ page: pageNumber, searchTerm: "" }));
      await dispatch(setPageNumber(pageNumber));
      toast.success(`Product loaded for page ${pageNumber}`);
    } catch (error) {
      console.error(`Failed to load product for page ${pageNumber}:`, error);
      toast.error("Failed to load product for the selected page.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchProducts({ page: currentPage, searchTerm: searchTerm }));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <h6 className="text-[30px] font-[600] mb-[1.5rem]">Deals</h6>
          {isopentoast && <Notification setisOpentoast={setisOpentoast} />}
          <div>
            <TableContent
              title={`All Deals (${
                data?.pagination?.totalRecords
                  ? data?.pagination?.totalRecords
                  : 0
              })`}
              subtitle={"All of Your Deals List"}
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
