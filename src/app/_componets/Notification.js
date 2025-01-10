import React from "react";
import { IoClose } from "react-icons/io5";
import { LuSquareCheckBig } from "react-icons/lu";
function Notification({ title, setisOpentoast }) {
  return (
    <div className="bg-green h-[58.77px] p-[16px_24px] flex items-center justify-between rounded-[1.25rem] w-full">
      <div className="flex items-center gap-2 text-[16px] min-h-[56px] text-white ">
        <LuSquareCheckBig className="!text-[30px]" />
        {title ? (
          title
        ) : (
          <>
            <span className="font-bold">Success!</span>Successfully deleted
          </>
        )}
      </div>
      <div>
        <IoClose onClick={() => setisOpentoast(false)} className="text-white" />
      </div>
    </div>
  );
}

export default Notification;
