import React from "react";

const page = () => {
  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600] mb-[25px]">Push Notification</h6>
      <div className="shadow-custom w-full flex bg-white my-16  p-[30px]">
        <div className="mx-auto w-full lg:w-auto">
          <h4 className="mb-3 text-[#3d4465]">Add Push</h4>
          <form className="w-full xl:w-[725px]">
            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Audiance
            </p>
            <select className="border-[1px] w-full bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]">
              <option>All</option>
              <option>Specific Customer</option>
            </select>

            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Heading
            </p>
            <input
              type="text"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="caption"
              id="caption"
              placeholder="Heading ?"
              required=""
            />

            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Message
            </p>
            <textarea
              type="text"
              className="border-[1px]  w-full border-[#f0f1f5] min-h-[50px] focus:outline-none p-[6px_12px]"
              name="caption"
              id="caption"
              placeholder="Enter Answer here...  "
              required=""
            />

            <hr className="my-4" />
            <button
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
              type="submit"
            >
              Add Push
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
