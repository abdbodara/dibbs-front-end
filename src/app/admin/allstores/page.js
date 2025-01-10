"use client";
import TableContent from "@/app/admin/allstores/TableContent";
import StoresTable from "@/app/_componets/tables/StoresTable";
import React, { useEffect, useState } from "react";
import {
  deleteStore,
  fetchStores,
  updateStoreStatus,
} from "@/store/slices/storesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/app/_componets/Loader";
import { setPageNumber } from "@/store/slices/customerSlice";

function Page() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stores);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStores({ page: currentPage, searchTerm: "" }));
      } catch (error) {
        console.error("Failed to load Store data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchStores({ page: pageNumber, searchTerm: "" }));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load Store for page ${pageNumber}:`, error);
    }
  };

  const handleDeactivate = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await dispatch(
        updateStoreStatus({ id, status: newStatus })
      ).unwrap();
      toast.success(response);
      await dispatch(fetchStores({ page: currentPage, searchTerm }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteStore(id)).unwrap();
      toast.success(response.message);
      await dispatch(fetchStores({ page: currentPage, searchTerm }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchStores({ page: currentPage, searchTerm }));
    }
  };

  const [showdata, setShowdata] = useState(data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <h6 className="text-[30px] font-[600]">Stores List</h6>
          <div>
            <TableContent
              loading={loading}
              setShowdata={setShowdata}
              stores={data}
              dataLength={data.pagination}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
            >
              {({ stores }) => (
                <StoresTable
                  stores={stores}
                  pagination={data.pagination}
                  onPageChange={handlePageChange}
                  onDeactivate={handleDeactivate}
                  handleDelete={handleDelete}
                />
              )}
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
