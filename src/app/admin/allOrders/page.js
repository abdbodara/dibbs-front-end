"use client";
import OrdersTable from "@/app/_componets/tables/OrdersTable";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import { fetchOrders } from "@/store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPageNumber } from "@/store/slices/customerSlice";
import Loader from "@/app/_componets/Loader";

function Page() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.orders);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrders({ page: currentPage, searchTerm: "" }));
      } catch (error) {
        console.error("Failed to load order data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchOrders({ page: pageNumber, searchTerm: "" }));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load orders for page ${pageNumber}:`, error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchOrders({ page: currentPage, searchTerm: searchTerm }));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <h6 className="text-[30px] font-[600]">Orders</h6>
          <div>
            <TableContent
              orders={data}
              dataLength={data.pagination}
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
              searchTerm={searchTerm}
            >
              <OrdersTable
                pagination={data.pagination}
                onPageChange={handlePageChange}
                orders={data}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
