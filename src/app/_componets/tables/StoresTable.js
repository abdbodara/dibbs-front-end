import React from "react";
import { MenuTable } from "../MenuItem";
import Pagination from "../Pagination";
import { MenuOpen } from "./MenuOpen";
import Loader from "../Loader";
function StoresTable({
  stores,
  pagination,
  onPageChange,
  onDeactivate,
  handleDelete,
}) {
  return (
    <>
      <div>
        <div className="max-w-full overflow-x-auto min-h-[57vh]">
          <table className="table display mb-4 dataTablesCard shadow-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]">
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[222px]">
                  Store ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[292px]">
                  Store Name
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[278px]">
                  User Name
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[173px]">
                  Email
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[259px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[189px]">
                  Status
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[62px]"></th>
              </tr>
            </thead>
            <tbody>
              {stores?.map((store) => (
                <tr key={store.store_id}>
                  <td className="p-[12px]  text-[12px] lg:text-[15px] font-[500] text-black text-start w-[222px]">
                    {store.store_id}
                  </td>
                  <td className="p-[12px]  text-[12px] lg:text-[15px] font-[500] text-black text-start w-[222px]">
                    {store.store_name}
                  </td>
                  <td className="p-[12px]  text-[12px] lg:text-[15px] font-[500] text-black text-start w-[222px]">
                    <div className="flex items-center gap-[16px]">
                      <div className="min-w-[50px] min-h-[50px] bg-sky rounded-full">
                        {/* image */}
                      </div>
                      <div>
                        <h6 className="text-[16px]">{store.user_name}</h6>
                        <span className="text-[14px] text-grey font-[400]">
                          {store.store_name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    {store.email}
                  </td>
                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    {new Date(store.added_on).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    <div>
                      <button
                        className={`w-max p-[10px_16px] rounded-[30px] text-white text-[13px] ${
                          store.store_status === "active"
                            ? "bg-green hover:bg-[#24a247]"
                            : "bg-red-500 hover:bg-[#d32f2f]"
                        }`}
                      >
                        {store.store_status}
                      </button>
                    </div>
                  </td>
                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    <MenuOpen
                      option={[
                        {
                          id: 1,
                          name:
                            store.store_status === "active"
                              ? "Deactivate"
                              : "Activate",
                          onclick: () =>
                            onDeactivate(store.store_id, store.store_status),
                        },
                        {
                          id: 3,
                          name: "Delete",
                          onclick: () => handleDelete(store.store_id),
                        },
                        {
                          id: 2,
                          name: "Edit",
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

export default StoresTable;
