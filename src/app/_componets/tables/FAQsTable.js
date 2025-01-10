import React from "react";
import { MenuTable } from "../MenuItem";
import Pagination from "../Pagination";
import { deleteFaqs, fetchFaqs } from "@/store/slices/faqslice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function FAQsTable({ faqs, pagination, onPageChange }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.customer?.currentPage);

  const handleDelete = async (faqsId) => {
    try {
      await dispatch(deleteFaqs(faqsId));
      await dispatch(fetchFaqs(currentPage));
      toast.success(`Faqs deleted successfully`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleEdit = async (faqsId) => {
    router.push(`/admin/faqs/${faqsId}`);
  };
  return (
    <>
      <div>
        <div className="max-w-full min-w-full overflow-x-auto  min-h-[57vh]">
          <table
            className="table display mb-4 dataTablesCard shadow-full min-w-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]"
            // style="display: inline-table; overflow-full min-w-x: auto;"
          >
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[222px]">
                  FAQ ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[292px]">
                  Question
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[278px]">
                  Answer
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[259px] hidden lg:table-cell">
                  Status
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[173px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-full min-w-[173px]"></th>
              </tr>
            </thead>
            <tbody>
              {faqs.data?.map((faq) => (
                <tr key={faq.auto_id}>
                  <td className="p-[12px]">
                    <span className="text-[14px] font-[400]">
                      {faq.auto_id}
                    </span>
                  </td>

                  <td className="p-[12px] text-[12px] lg:text-[15px] font-[400]">
                    {faq.question}
                  </td>

                  <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                    {faq.answer}
                  </td>

                  <td className="p-[12px] text-[12px] text-nowrap lg:text-[15px] font-[400]">
                    {faq.status}
                  </td>

                  <td className="p-[12px]">
                    <span className="text-[14px] font-[400]">
                      {new Date(faq.added_on).toLocaleString("en-US", {
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
                    <div className="flex items-stretch">
                      <MenuTable
                        option={[
                          {
                            id: 1,
                            name: "Delete",
                            onclick: () => handleDelete(faq?.auto_id),
                          },
                          {
                            id: 2,
                            name: "Edit",
                            onclick: () => handleEdit(faq?.auto_id),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
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

export default FAQsTable;
