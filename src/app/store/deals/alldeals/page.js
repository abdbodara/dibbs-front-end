"use client";
import React, { useEffect, useState } from "react";
import PendingDealsTable from "@/app/_componets/tables/PendingDealsTable";
import TableContent from "../TableContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchStoreProducts } from "@/store/slices/dealSlice";
import Notification from "@/app/_componets/Notification";
import { toast } from "react-toastify";
import { setPageNumber } from "@/store/slices/customerSlice";
import Loader from "@/app/_componets/Loader";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

function Page() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const { productData, loading, error } = useSelector((state) => state.product);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [isopentoast, setisOpentoast] = useState(false);

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
            fetchStoreProducts({ userId, page: currentPage, searchTerm })
          );
          // toast.success(response.payload.message);
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
        fetchStoreProducts({ userId, page: pageNumber, searchTerm })
      );
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load product for page ${pageNumber}:`, error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(
        fetchStoreProducts({
          userId,
          page: currentPage,
          searchTerm: searchTerm,
        })
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <h6 className="text-[30px] font-[600] mb-[1.5rem]">My Store Deals</h6>
          {isopentoast && <Notification setisOpentoast={setisOpentoast} />}
          <div>
            <TableContent
              title={`Store Deals (${
                productData?.pagination?.totalRecords
                  ? productData?.pagination?.totalRecords
                  : 0
              })`}
              subtitle={
                "All of your store deals that you create will be listed in the section below where you will also have the option to edit them and see their status."
              }
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
              searchTerm={searchTerm}
            >
              <PendingDealsTable
                products={productData}
                pagination={productData.pagination}
                onPageChange={handlePageChange}
                setisOpentoast={setisOpentoast}
                userId={userId}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
