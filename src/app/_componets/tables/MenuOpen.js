import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiDotsVertical } from "react-icons/hi";

export const MenuOpen = ({ isopen, option = [], onclick, btn }) => {
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
          <Menu.Items className="absolute right-0  min-w-[160px] -mt-1 z-[9] rounded-[1.25rem] origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className=" py-1 ">
              {option?.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <button
                        key={item.id}
                        onClick={() => item.onclick()}
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
