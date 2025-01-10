import React from "react";
import { MenuTable } from "../MenuItem";
import Pagination from "../Pagination";

function SupportQueriesTable({
  supportQueries,
  pagination,
  onPageChange,
  handleDoneClick,
}) {
  return (
    <>
      <div>
        <div className="max-w-[100%] min-w-full  min-h-[57vh]">
          <table
            className="table display mb-4 dataTablesCard shadow-[100%] min-w-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflow-[100%] min-w-x: auto;"
          >
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[222px]">
                  ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[292px]">
                  User Name
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[278px]">
                  User Email
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[259px] hidden lg:table-cell">
                  Message
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[173px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[173px]">
                  Status
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start -w-[173px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {supportQueries?.data?.length > 0 &&
                supportQueries?.data?.map((support) => {
                  return (
                    <tr key={support.auto_id}>
                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {support.auto_id}
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {support.first_name} {support.last_name}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {support?.email}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {support?.message}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {new Date(support.added_on).toLocaleString("en-US", {
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
                          {support.status}
                        </button>
                      </td>

                      <td className="p-[12px]">
                        <div className="flex items-stretch">
                          <MenuTable
                            option={[
                              {
                                id: 1,
                                name: "Done",
                                onclick: () => handleDoneClick(support.auto_id),
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

export default SupportQueriesTable;
