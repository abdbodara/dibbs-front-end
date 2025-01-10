import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
function TableContent({ children, title, subtitle }) {
  const [isopen, setIsopen] = useState(true);
  return (
    <div className="w-full mt-4">
      <div className="flex items-center w-full border-3 flex-wrap justify-between mb-[24px]">
        <div>
          <h6 className="text-[20px] mb-[8px]">{title}</h6>
          <p className="text-[12px] text-grey">{subtitle}</p>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex flex-1 items-center gap-2 border-[#f0f1f5] border-2 h-[56px] rounded-2xl px-2">
            <FaRegCalendarAlt  />
            <input
              placeholder="Search"
              className="border-2 w-full border-black pl-2"
            />
          </div>
          
        </div>
      </div>
      {children}
    </div>
  );
}

export default TableContent;
