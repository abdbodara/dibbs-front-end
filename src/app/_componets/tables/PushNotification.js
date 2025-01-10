import React from "react";
import { MenuTable } from "../MenuItem";
import Pagination from "../Pagination";
import {
  deletePushNotification,
  fetchPushNotification,
} from "@/store/slices/pushNotificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function PushNotification({
  pushNotification,
  pagination,
  onPageChange,
  currentPage,
}) {
  const dispatch = useDispatch();

  const handleDelete = async (faqsId) => {
    try {
      await dispatch(deletePushNotification(faqsId));
      await dispatch(fetchPushNotification(currentPage));
      toast.success(`Push Notification deleted successfully`);
    } catch (error) {
      console.error("Error deleting push notification:", error);
    }
  };
  return (
    <>
      <div>
        <div className="max-w-full overflow-x-auto min-h-[57vh]">
          <table
            className="table display mb-4 dataTablesCard shado w-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflo w-x: auto;"
          >
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[222px]">
                  ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[292px]">
                  Audiance
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[278px]">
                  User
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[259px] hidden lg:table-cell">
                  Heading
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[173px]">
                  Message
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[173px]">
                  Status
                </th>

                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[173px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start  w-[173px]"></th>
              </tr>
            </thead>
            <tbody>
              {pushNotification?.data?.length > 0 &&
                pushNotification?.data?.map((notification) => {
                  return (
                    <tr key={notification?.auto_id}>
                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {notification?.auto_id}
                        </span>
                      </td>

                      <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                        {notification?.audiance}
                      </td>

                      <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                        {notification?.customer_id}
                      </td>

                      <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                        {notification?.heading}
                      </td>

                      <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                        {notification?.message}
                      </td>

                      <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                        {notification?.status}
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {new Date(notification.added_on).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            }
                          )}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <div className="flex items-stretch">
                          <MenuTable
                            option={[
                              {
                                id: 1,
                                name: "Delete",
                                onclick: () =>
                                  handleDelete(notification?.auto_id),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
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

export default PushNotification;
