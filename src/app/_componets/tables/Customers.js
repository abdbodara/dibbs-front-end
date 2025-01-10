"use client";
import React from "react";
import { MenuTable } from "../MenuItem";
import Images from "../Images";
import Pagination from "../Pagination";
import { MenuOpen } from "./MenuOpen";

function Customers({
  customers,
  pagination,
  onPageChange,
  handleDeactivate,
  handleReferelCredit,
  handleDeleteCustomer,
}) {
  return (
    <>
      <div>
        <div className="max-w-full  min-h-[57vh] overflow-x-auto">
          <table
            className="table display mb-4 dataTablesCard shadow-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflow-x: auto;"
          >
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[222px]">
                  Customer ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[292px]">
                  Name
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[278px]">
                  Email
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[259px] hidden lg:table-cell">
                  Total Credit Balance
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[173px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[189px]">
                  Status
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[62px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers?.data?.map((customer) => (
                <tr key={customer.customer_id}>
                  <td className="p-[12px]">
                    <span className="text-[14px] font-[400]">
                      {customer?.customer_id}
                    </span>
                  </td>

                  <td className="p-[12px]  text-[12px] lg:text-[15px] font-[500] text-black text-start w-[222px]">
                    <div className="flex items-center gap-[16px]">
                      <div className="min-w-[50px] min-h-[50px] bg-sky rounded-full">
                        <Images
                          file={"img"}
                          name={"user.png"}
                          classname={"w-[57px] "}
                        />
                      </div>
                      <div>
                        <h6 className="text-[16px]">{customer?.first_name}</h6>
                        <span className="text-[14px] text-grey font-[400]">
                          Online Shop
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    {customer?.email}
                  </td>

                  <td className="p-[12px]">
                    <span className="text-[14px] font-[400]">
                      {" "}
                      {customer?.credits}
                    </span>
                  </td>

                  <td className="p-[12px]">
                    <span className="text-[14px] font-[400]">
                      {new Date(customer.added_on).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </td>

                  <td className="p-[12px]">
                    <button className="w-max bg-green p-[10px_16px] rounded-[30px] text-white text-[13px] duration-500 hover:bg-[#24a247]">
                      {customer?.status}
                    </button>
                  </td>

                  {/* <td className="p-[12px]">
                    <div className="flex items-stretch">
                      <MenuTable
                        option={[
                          {
                            id: 1,
                            name: "Deactivate",
                          },
                          {
                            id: 2,
                            name: "Edit Referral Credits",
                          },
                        ]}
                      />
                    </div>
                  </td> */}
                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    <MenuOpen
                      option={[
                        {
                          id: 1,
                          name:
                            customer?.status === "active"
                              ? "Deactivate"
                              : "Active",
                          onclick: () =>
                            handleDeactivate(
                              customer.customer_id,
                              customer.status
                            ),
                        },
                        {
                          id: 2,
                          name: "Edit Referral Credits",
                          onclick: () => handleReferelCredit(customer),
                        },
                        {
                          id: 3,
                          name: "Delete",
                          onclick: () =>
                            handleDeleteCustomer(customer.customer_id),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalItems={pagination?.totalRecords}
        itemsPerPage={pagination?.limit}
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Customers;
