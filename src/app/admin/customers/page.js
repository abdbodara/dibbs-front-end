"use client";

import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import Customers from "@/app/_componets/tables/Customers";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  fetchCustomer,
  setPageNumber,
  updateCustomerReferelCredit,
  updateCustomerStatus,
} from "@/store/slices/customerSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/app/_componets/Loader";

function Page() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.customer);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [showdata, setShowdata] = useState(data);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCustomer({ page: currentPage, searchTerm: "" }));
      } catch (error) {
        console.error("Failed to load customer data:", error);
        toast.error("Failed to load customer data.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(setPageNumber(pageNumber));
      await dispatch(fetchCustomer({ page: pageNumber, searchTerm: "" }));
    } catch (error) {
      console.error(`Failed to load customer for page ${pageNumber}:`, error);
      toast.error("Failed to load customer for the selected page.");
    }
  };

  const handleDeactivate = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await dispatch(updateCustomerStatus({ id, status: newStatus })).unwrap();
      await dispatch(fetchCustomer({ page: currentPage, searchTerm: "" }));
    } catch (error) {
      toast.error(error?.message || "Failed to update customer status.");
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await dispatch(deleteCustomer({ customerId })).unwrap();
      await dispatch(fetchCustomer({ page: currentPage, searchTerm: "" }));
    } catch (error) {
      toast.error(error?.message || "Failed to Delete customer status.");
    }
  };
  const handleReferelCredit = async (customer) => {
    router.replace(`/admin/customers/${customer.customer_id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchCustomer({ page: currentPage, searchTerm: searchTerm }));
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <h6 className="text-[30px] font-[600]">Customers</h6>
          <div>
            <TableContent
              setShowdata={setShowdata}
              customers={data}
              dataLength={data.pagination}
              handleSearchChange={handleSearchChange}
              handleSearchKeyDown={handleSearchKeyDown}
              searchTerm={searchTerm}
            >
              <Customers
                customers={data}
                pagination={data.pagination}
                onPageChange={handlePageChange}
                handleDeactivate={handleDeactivate}
                handleReferelCredit={handleReferelCredit}
                handleDeleteCustomer={handleDeleteCustomer}
              />
            </TableContent>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
