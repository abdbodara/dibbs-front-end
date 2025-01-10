import { logout } from "@/store/slices/authThunk";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { FiUser } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function MenuItem({ isopen, option = [], btn, onclick }) {
  const [selectvalue, setselectvalue] = useState(option[0].name);
  return (
    <div className="">
      <Menu
        onChange={(e) => console.log(e)}
        as="div"
        className="relative inline-block text-left"
      >
        <Menu.Button className="inline-flex w-full justify-between border-2 h-[56px] min-w-[220px] text-grey items-center border-[#f0f1f5] rounded-2xl  px-4 py-2 text-sm  focus:outline-none ">
          {selectvalue}
          <IoChevronUp />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 left-0 mt-2 w-[160px] rounded-[1.25rem] origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1 ">
              {option?.map((item, index) => {
                return (
                  <Menu.Item
                    onClick={() => setselectvalue(item.name)}
                    key={index}
                  >
                    {({ active }) => (
                      <button
                        onClick={item?.onclick}
                        key={item?.id}
                        className={`${
                          active ? "bg-[#1eaae7] text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item?.name}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export const MenuTable = ({ isopen, option = [], onclick, btn }) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="">
          <HiDotsVertical className="text-2xl" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-0 mt-2 min-w-[160px]  rounded-[1.25rem] origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1 ">
              {option?.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <button
                        key={item.id}
                        onClick={() => item?.onclick()}
                        className={`group flex w-full text-nowrap items-center rounded-md px-4 text-grey py-2 text-sm text-center`}
                      >
                        {item?.name}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const ProfileItem = ({ option = [], onclick, btn }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout successful!");
      nav.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  const nav = useRouter();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="">{btn}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 min-w-[160px]  rounded-[1.25rem] origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => nav.push("/admin/profile")}
                    className={`group flex gap-2 w-full text-nowrap items-center rounded-md px-4 text-grey py-2 text-sm text-center`}
                  >
                    <FiUser />
                    profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`group flex gap-2 w-full text-nowrap items-center rounded-md px-4 text-grey py-2 text-sm text-center`}
                  >
                    <IoIosLogOut />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const StoreProfileItem = ({ option = [], onclick, btn }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout successful!");
      nav.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  const nav = useRouter();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="">{btn}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 min-w-[160px]  rounded-[1.25rem] origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => nav.push("/store/profile")}
                    className={`group flex gap-2 w-full text-nowrap items-center rounded-md px-4 text-grey py-2 text-sm text-center`}
                  >
                    <FiUser />
                    profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`group flex gap-2 w-full text-nowrap items-center rounded-md px-4 text-grey py-2 text-sm text-center`}
                  >
                    <IoIosLogOut />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
