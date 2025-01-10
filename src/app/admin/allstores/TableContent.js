import React, { useEffect, useState } from "react";
import MenuItem from "../../_componets/MenuItem";
import { FaRegCalendarAlt } from "react-icons/fa";

function TableContent({
  handleSearchChange,
  stores,
  handleSearchKeyDown,
  dataLength,
  children,
  searchTerm,
  setShowdata,
}) {
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredStores = stores?.data?.filter((store) => {
    if (statusFilter === "All") return true;
    return store.store_status.toLowerCase() === statusFilter.toLowerCase();
  });

  useEffect(() => {
    setShowdata(filteredStores);
  }, [setShowdata]);
  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center w-full border-3 flex-wrap justify-between mb-[24px]">
        <div>
          <h6 className="text-[20px] mb-[8px]">
            Stores ({dataLength?.totalRecords ? dataLength?.totalRecords : 0})
          </h6>
          <p className="text-[12px] text-grey">Stores list from website</p>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex-1">
            <MenuItem
              option={[
                {
                  id: 1,
                  name: "All",
                  onclick: (e) => handleStatusChange(e.target.innerText),
                },
                {
                  id: 2,
                  name: "Active",
                  onclick: (e) => handleStatusChange(e.target.innerText),
                },
                {
                  id: 3,
                  name: "Deleted",
                  onclick: (e) => handleStatusChange(e.target.innerText),
                },
              ]}
            />
          </div>
          <div className="flex flex-1 items-center gap-2 border-[#f0f1f5] border-2 h-[56px] rounded-2xl px-2">
            <FaRegCalendarAlt />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              onKeyDown={handleSearchKeyDown}
              className="border-2 w-full border-black"
            />
          </div>
        </div>
      </div>
      {children({ stores: filteredStores })}
    </div>
  );
}

export default TableContent;
