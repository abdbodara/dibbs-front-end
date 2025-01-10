import React from "react";
import { MenuTable } from "../MenuItem";
import Pagination from "../Pagination";

function DiscountCoupons({
  discountCoupons,
  pagination,
  onPageChange,
  handleDelete,
}) {
  return (
    <>
      <div>
        <div className="max-w-full min-h-[57vh] overflow-x-auto">
          <table
            className="table display mb-4 dataTablesCard shadow-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflow-x: auto;"
          >
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[222px]">
                  ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[292px]">
                  Coupon Code
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[278px]">
                  Coupon Discount
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[259px] hidden lg:table-cell">
                  Coupon Email
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
              {discountCoupons?.data?.map((coupons) => {
                return (
                  <tr key={coupons.auto_id}>
                    <td className="p-[12px]">
                      <span className="text-[14px] font-[400]">
                        {coupons.auto_id}
                      </span>
                    </td>

                    <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                      {coupons.code}
                    </td>
                    <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                      {coupons.discount}%
                    </td>

                    <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                      {coupons.email}
                    </td>

                    <td className="p-[12px]">
                      <span className="text-[14px] font-[400]">
                        {new Date(coupons.added_on).toLocaleString("en-US", {
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
                        {coupons.status}
                      </button>
                    </td>

                    <td className="p-[12px]">
                      <div className="flex items-stretch">
                        <MenuTable
                          option={[
                            {
                              id: 1,
                              name: "Delete",
                              onclick: () => handleDelete(coupons.auto_id),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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

export default DiscountCoupons;
