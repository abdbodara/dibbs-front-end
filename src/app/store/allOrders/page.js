"use client";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import {
  cancelOrder,
  fetchOrders,
  fetchStoreOrders,
} from "@/store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPageNumber } from "@/store/slices/customerSlice";
import Loader from "@/app/_componets/Loader";
import StoreOrdersTable from "@/app/_componets/tables/StoreOrdersTable";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

function Page() {
  const dispatch = useDispatch();
  const { storeData, loading, error } = useSelector((state) => state.orders);
  const [userId, setUserId] = useState();
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;
      setUserId(userId);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await dispatch(
            fetchStoreOrders({ userId, page: currentPage, searchTerm: "" })
          );
          toast.success(response.payload.message);
        } catch (error) {
          toast.error(error);
        }
      };

      fetchData();
    }
  }, [dispatch, userId, currentPage]);
  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(
        fetchStoreOrders({ userId, page: pageNumber, searchTerm: "" })
      );
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load orders for page ${pageNumber}:`, error);
      toast.error("Failed to load orders for the selected page.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(
        fetchStoreOrders({ userId, page: currentPage, searchTerm: searchTerm })
      );
    }
  };
  const handleCancelOrder = async (order) => {
    try {
      await dispatch(cancelOrder(order.order_id));
      await dispatch(
        fetchStoreOrders({ userId, page: currentPage, searchTerm: "" })
      );
      toast.success(`Order status updated to successfully!`);
    } catch (error) {
      toast.error(error?.message || "Failed to update order status.");
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
              orders={storeData}
              dataLength={storeData.pagination}
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
              searchTerm={searchTerm}
            >
              <StoreOrdersTable
                pagination={storeData.pagination}
                onPageChange={handlePageChange}
                orders={storeData}
                handleCancelOrder={handleCancelOrder}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
