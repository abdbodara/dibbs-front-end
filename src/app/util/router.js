import { CgDatabase } from "react-icons/cg";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
import { IoEarthOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { MdSupportAgent } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { FaBarsProgress } from "react-icons/fa6";
export const router = [
  {
    id: 1,
    name: "Dashboard",
    icon: <CgDatabase className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "Dashboard",
        link: "/admin",
      },
    ],
  },
  {
    id: 2,
    name: "Stores",
    icon: <MdOutlineLocalGroceryStore className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Stores",
        link: "/admin/allstores",
      },
    ],
  },
  {
    id: 3,
    name: "Orders",
    icon: <IoLayersOutline className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Orders",
        link: "/admin/allOrders",
      },
    ],
  },
  {
    id: 4,
    name: "Deals",
    icon: <AiOutlineControl className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "Pending Deals",
        link: "/admin/deals",
      },
      {
        id: 2,
        name: "All Deals",
        link: "/admin/deals/alldeals",
      },
    ],
  },
  {
    id: 5,
    name: "Customers",
    icon: <IoEarthOutline className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Customers",
        link: "/admin/customers",
      },
    ],
  },
  {
    id: 6,
    name: "Categories",
    icon: <AiOutlineControl className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "Add New Category",
        link: "/admin/allcategories/addCategories",
      },
      {
        id: 2,
        name: "All Categories",
        link: "/admin/allcategories",
      },
    ],
  },
  {
    id: 7,
    name: "FAQs",
    icon: <FaQuestion className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All FAQs",
        link: "/admin/faqs",
      },
    ],
  },
  {
    id: 8,
    name: "Push Alerts",
    icon: <HiMiniBellAlert className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Push",
        link: "/admin/notification",
      },
    ],
  },
  {
    id: 9,
    name: "Support Queries",
    icon: <MdSupportAgent className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: " Support Queries",
        link: "/admin/supportQueries",
      },
    ],
  },
  {
    id: 10,
    name: "Discount Coupons",
    icon: <MdDiscount className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: " All Coupons",
        link: "/admin/discountCoupons",
      },
    ],
  },
  {
    id: 11,
    name: "Add User",
    icon: <FaUserAlt className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "Add User",
        link: "/admin/userprofile",
      },
    ],
  },
];

export const storeRouter = [
  {
    id: 1,
    name: "Dashboard",
    icon: <GrSettingsOption className="text-2xl" />,
    link: "/store",
  },
  {
    id: 2,
    name: "Deals",
    icon: <FaBarsProgress className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Deals",
        link: "/store/deals/alldeals",
      },
      {
        id: 2,
        name: "Add New Deals",
        link: "/store/deals/NewDeals",
      },
    ],
  },
  {
    id: 3,
    name: "Orders",
    icon: <IoLayersOutline className="text-2xl" />,
    subrouter: [
      {
        id: 1,
        name: "All Orders",
        link: "/store/allOrders",
      },
    ],
  },
  {
    id: 4,
    name: "Logout",
    icon: <GrSettingsOption className="text-2xl" />,
  },
];
