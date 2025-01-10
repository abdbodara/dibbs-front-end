import React from "react";
import Images from "./Images";

function Tooltips({ title }) {
  return (
    <div className="relative group">
      <Images classname={"w-[20px] h-[20px]"} file={"img"} name={"ping.png"} />
      <div className="absolute top-[23px] shadow-lg cursor-pointer group-hover:block hidden p-[10px] max-w-[400px] w-[200px] h-[auto] bg-[#000000bd] text-white text-[12px] font-normal rounded-md">
        {title ? title : "Tooltip"}
      </div>
    </div>
  );
}

export default Tooltips;
