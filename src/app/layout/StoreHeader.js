import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getStoreProfile } from "@/store/slices/profileSlice";
import Images from "../_componets/Images";
import { FaArrowRightLong } from "react-icons/fa6";
import MenuItem, {
  ProfileItem,
  StoreProfileItem,
} from "../_componets/MenuItem";
import { FiUser } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
function StoreHeader({ setIsopenSidebar, isopenSidebar, mediaScreen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { storeProfileData } = useSelector((state) => state.profile);
  console.log("🚀 ~ StoreHeader ~ storeProfileData:", storeProfileData);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await dispatch(getStoreProfile()).unwrap();
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [dispatch]);
  const fullsrc =
    storeProfileData?.store_logo &&
    `https://dibbs-back-end.onrender.com/${storeProfileData.store_logo}`;
  return (
    <div className="min-h-[120px] bg-bg sticky top-0 left-0 flex items-center z-[999] w-full px-[20px] lg:pr-[2.4rem]">
      <div className="flex items-center">
        {mediaScreen == "sm" && (
          <>
            <Images
              file={"img"}
              name={"logo.png"}
              classname={"w-[52px] h-auto"}
            />
            <div
              onClick={() => setIsopenSidebar((prev) => !prev)}
              className="flex flex-col items-end group duration-1000 ml-2"
            >
              {isopenSidebar ? (
                <>
                  <div className="bg-sky w-[20px] my-[4px] h-[3px] rounded-[3px] group-hover:w-[26px] duration-300" />
                  <div className="bg-sky w-[26px] my-[4px] h-[3px] rounded-[3px]" />
                  <div className="bg-sky w-[20px] my-[4px] h-[3px] rounded-[3px] group-hover:w-[26px] duration-300" />
                </>
              ) : (
                <FaArrowRightLong className="text-sky text-[25px] " />
              )}
            </div>
          </>
        )}
        {mediaScreen == "lg" && (
          <div
            onClick={() => setIsopenSidebar((prev) => !prev)}
            className="flex flex-col items-end group duration-1000 ml-2"
          >
            {isopenSidebar ? (
              <>
                <div className="bg-sky w-[20px] my-[4px] h-[3px] rounded-[3px] group-hover:w-[26px] duration-300" />
                <div className="bg-sky w-[26px] my-[4px] h-[3px] rounded-[3px]" />
                <div className="bg-sky w-[20px] my-[4px] h-[3px] rounded-[3px] group-hover:w-[26px] duration-300" />
              </>
            ) : (
              <FaArrowRightLong className="text-sky text-[25px] " />
            )}
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-[30px]">
        <div>
          <h3 className="text-[16px] font-[400]">
            Hello,
            <strong className="">{storeProfileData?.store_name}</strong>
          </h3>
          <p className="text-[12px] text-[#464a53] font-[400] text-end">
            Administrator
          </p>
        </div>
        <StoreProfileItem
          btn={<Images fullsrc={fullsrc} classname={"w-[57px] "} />}
          option={[
            {
              id: 1,
              name: "profile",
              icon: <FiUser />,
              link: "/admin/profile",
            },
            {
              id: 2,
              name: "Logout",
              icon: <IoIosLogOut />,
              link: "/login",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default StoreHeader;
