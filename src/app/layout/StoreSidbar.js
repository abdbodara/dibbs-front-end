"use client";
import React, { useState } from "react";
import Images from "../_componets/Images";
import { LuChevronRight } from "react-icons/lu";
import "@fortawesome/fontawesome-free/css/all.css";
import { storeRouter } from "../util/router";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/store/slices/authThunk";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function StoreSidbar({ isopenSidebar, mediaScreen }) {
  const [isopen, setIsopen] = useState(null);
  const path = usePathname();
  const dispatch = useDispatch();
  const navrouter = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout successful!");
      navrouter.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <div
      className={` ${isopenSidebar ? "w-[21.563rem]" : "w-[5rem]"}  top-[120px] 
        ${
          mediaScreen == "sm" &&
          `absolute  ${!isopenSidebar ? "left-[-100px]" : "left-0"} `
        }
        h-screen overflow-y-auto duration-700 bg-bg`}
    >
      <div
        className={`h-[120px] hidden md:flex items-center  ${
          isopenSidebar ? "px-[50px]" : "px-[13px]"
        }    `}
      >
        {/* {!mediaScreen == "sm" && (
        )} */}
        <Images file={"img"} name={"logo.png"} classname={"w-[52px] h-auto "} />
        {isopenSidebar && (
          <Images
            file={"img"}
            name={"logo-text.png"}
            classname={"w-[120px] h-auto ml-[10px]"}
          />
        )}
      </div>
      <div
        className={` ${
          isopenSidebar ? "lg:pl-[30px] px-[20px]" : "pl-[0px]"
        }  lg:pt-[15px]`}
      >
        <div className="flex flex-col">
          {storeRouter?.map((nav, index) => {
            return (
              <div
                onClick={() => {
                  if (nav.name === "Logout") {
                    handleLogout();
                  } else {
                    setIsopen((prev) => (prev === nav.id ? null : nav.id));
                    !nav.subrouter && navrouter.push(`${nav?.link}`);
                  }
                }}
                key={nav.id}
                className={`min-h-[42px] ${
                  isopenSidebar && "lg:min-h-[70px]"
                }  `}
              >
                <div
                  className={`cursor-pointer flex items-center ${
                    isopenSidebar
                      ? "lg:p-[5px_18px] lg:me-[15px]"
                      : "p-[5px] lg:p-[0px_5px]"
                  } `}
                >
                  <div>
                    <div
                      className={`md:w-[60px] group flex items-center justify-center w-[20px] h-[20px] md:h-[60px] me-[15px]  ${
                        isopen == nav.id ? "bg-sky text-white" : "text-grey"
                      }  rounded-full bg-none   `}
                    >
                      {nav.icon}
                    </div>
                  </div>

                  {isopenSidebar && (
                    <>
                      <h6
                        className={`text-[18px] ${
                          isopen == nav.id
                            ? "text-black group-hover:text-sky"
                            : "text-grey group-hover:text-sky"
                        } text-grey group-hover:text-sky`}
                      >
                        {nav.name}
                      </h6>
                      {nav.subrouter && (
                        <LuChevronRight
                          className={`ml-auto  text-grey group-hover:text-sky text-[20px]
  ${isopen == nav.id && "rotate-90"}
  `}
                        />
                      )}
                    </>
                  )}
                </div>

                {isopenSidebar
                  ? isopen == nav.id && (
                      <div className="p-[8px_18px] cursor-pointer flex flex-col justify-end">
                        {nav.subrouter &&
                          nav?.subrouter.map((subnav) => (
                            <span
                              key={subnav.id}
                              onClick={() => navrouter.push(`${subnav?.link}`)}
                              className=" pl-[75px] py-[8px] text-[18px] group-hover:text-sky text-grey"
                            >
                              {subnav.name}
                            </span>
                          ))}
                      </div>
                    )
                  : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StoreSidbar;
