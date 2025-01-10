import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/slices/profileSlice";
import Images from "../_componets/Images";
import { FaArrowRightLong } from "react-icons/fa6";
import MenuItem, { ProfileItem } from "../_componets/MenuItem";
import { FiUser } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
function Header({ setIsopenSidebar, isopenSidebar, mediaScreen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state) => state.profile);
  console.log("🚀 ~ Header ~ profileData:", profileData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(getProfile()).unwrap();
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);
  const fullsrc =
    profileData?.userProfile?.profile_image &&
    `https://dibbs-back-end.onrender.com/${profileData?.userProfile?.profile_image}`;

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
            <strong className="">{profileData?.userProfile?.fullName || "User"}</strong>
          </h3>
          <p className="text-[12px] text-[#464a53] font-[400] text-end">
            Administrator
          </p>
        </div>
        <ProfileItem
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

export default Header;
