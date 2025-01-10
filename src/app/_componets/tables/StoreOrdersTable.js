import React, { useEffect, useState } from "react";
import { MenuTable } from "../MenuItem";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../Pagination";
import Images from "../Images";
import { useDispatch } from "react-redux";
import fetchProductDetails from "@/store/slices/orderSlice";
import { toast } from "react-toastify";
function StoreOrdersTable({
  pagination,
  onPageChange,
  orders,
  handleCancelOrder,
}) {
  const [add, setAdd] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdd(null);
    }
  }, []);
  const dispatch = useDispatch();
  const handleProductDetailsFetch = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  return (
    <>
      <div>
        <div className="max-w-full min-h-[57vh] overflow-x-auto">
          <table
            className="table display mb-4 dataTablesCard shadow-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflow-x: auto;"
          >
            <thead className={` border-b-[1px]`}>
              <tr>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[222px]">
                  Order ID
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[292px]">
                  Order Info
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[278px]">
                  Customer Info
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[173px]">
                  Total Amount
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[259px] hidden lg:table-cell">
                  Dibbs Deposit
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[259px] hidden lg:table-cell">
                  Remaining Amount
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[189px]">
                  Added On
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[189px]">
                  Order Status
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[189px]">
                  Payment Status
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[62px]">
                  Actions
                </th>
              </tr>
            </thead>
            {orders?.data?.length > 0 ? (
              orders?.data?.map((order) => (
                <tbody key={order.order_id}>
                  <>
                    <tr
                      className={`${
                        add == order?.order_id && "bg-sky "
                      } duration-400 `}
                    >
                      <td className="p-[12px]">{order.order_id}</td>
                      <td className="p-[12px]">
                        <h6 className="text-[16px] font-[600]">
                          {order.store[0]?.store_name}{" "}
                        </h6>
                        <span
                          className={`text-[14px] ${
                            add == order?.order_id && "text-white"
                          } font-[400]`}
                        >
                          1 items
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <h6 className="text-[16px] font-[600]">
                          {`${order.customer?.first_name || "Unknown"} ${
                            order.customer?.last_name || ""
                          }`}
                        </h6>
                        <span
                          className={`text-[14px]
                        ${add == order?.order_id && "text-white"}
                        font-[400]`}
                        >
                          {order.customer?.email || "No email"}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {order.total_price}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {order.owner_amount}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {order.remaining_amount}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {new Date(order.added_on).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <button
                          className={`
      ${
        order.status === "cancelled"
          ? "bg-red-500"
          : order.status === "pending"
          ? "bg-orange-500"
          : "bg-green"
      }
      text-white text-[12px] p-[3.2px_8.12px]`}
                        >
                          {order.status}
                        </button>
                      </td>

                      <td className="p-[12px]">
                        <button className="bg-green  text-[12px] p-[3.2px_8.12px]">
                          {order.payment_status}
                        </button>
                      </td>

                      <td className="p-[12px]">
                        <div className="flex items-stretch">
                          <MenuTable
                            option={[
                              {
                                id: 1,
                                name: "Cancel",
                                onclick: () => handleCancelOrder(order),
                              },
                            ]}
                          />
                          {add !== order?.order_id ? (
                            <AiOutlinePlus
                              onClick={() => {
                                setAdd((prev) =>
                                  prev == order?.order_id
                                    ? null
                                    : order?.order_id
                                );
                                handleProductDetailsFetch(
                                  order?.products[0]?.product_id
                                );
                              }}
                              className="text-xl cursor-pointer"
                            />
                          ) : (
                            <span
                              onClick={() => setAdd(null)}
                              className="text-xl ml-4 cursor-pointer"
                            >
                              -
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    {add === order?.order_id && (
                      <tr className="relative">
                        <td colSpan={11} className="p-0">
                          <div className="relative w-[90%] lg:w-[100%] mx-auto overflow-x-auto  ">
                            <table className="w-full !min-h-max table-auto border-collapse ">
                              <thead className=" border-b">
                                <tr>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Product
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Image
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Quantity
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Unit Price
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Total Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b last:border-none">
                                  <td className="p-4">
                                    <span className="text-[14px] font-[400]">
                                      #122
                                    </span>
                                  </td>

                                  <td className="p-4 text-gray-700 text-sm">
                                    <Images
                                      file={"img"}
                                      name={"user.png"}
                                      // src={product.image}
                                      // alt={product.name}
                                      classname={
                                        "max-w-[50px] max-h-[50px] object-cover rounded-full bg-sky"
                                      }
                                    />
                                  </td>
                                  <td className="p-4 text-gray-700 text-sm">
                                    <span className="text-[14px] font-[400]">
                                      1
                                    </span>
                                  </td>
                                  <td className="p-4 text-gray-700 text-sm">
                                    <span className="text-[14px] font-[400]">
                                      $ 9
                                    </span>
                                  </td>
                                  <td className="p-4 text-gray-700 text-sm">
                                    <span className="text-[14px] font-[400]">
                                      $ 9
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              ))
            ) : (
              <span>No Order found</span>
            )}
          </table>
        </div>
      </div>
      <Pagination
        totalItems={pagination?.totalRecords}
        itemsPerPage={pagination?.limit}
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default StoreOrdersTable;
