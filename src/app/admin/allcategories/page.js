"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CategoriesTable from "@/app/_componets/tables/CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/categorySlice";
import { setPageNumber } from "@/store/slices/customerSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableContent from "./TableContent";
import Loader from "@/app/_componets/Loader";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.categories);
  const currentPage = useSelector((state) => state.customer?.currentPage) || 1;
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories(currentPage));
      } catch (error) {
        console.error("Failed to load categories data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handlePageChange = async (pageNumber) => {
    try {
      await dispatch(fetchCategories(pageNumber));
      await dispatch(setPageNumber(pageNumber));
    } catch (error) {
      console.error(`Failed to load categories for page ${pageNumber}:`, error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="">
            <div className="flex items-center justify-between">
              <h6 className="text-[30px] font-[600]">Categories</h6>
              <button
                onClick={() =>
                  router.push("/admin/allcategories/addCategories")
                }
                className="w-max flex items-center bg-sky py-1 h-[41.52px] rounded-[30px] text-white text-[13px] duration-500 hover:bg-[#1593c9]"
              >
                <div className="w-[35px] bg-white rounded-full -ml-px grid place-content-center h-[35px] ">
                  <FaPlus className="text-sky" />
                </div>
                <span className="mx-[12px]">New Categories</span>
              </button>
            </div>
            <div>
              <TableContent dataLength={data.pagination}>
                <CategoriesTable
                  pagination={categories?.pagination}
                  onPageChange={handlePageChange}
                  categories={categories}
                  setCategories={setCategories}
                  currentPage={currentPage}
                />
              </TableContent>
            </div>
          </div>
        </DndProvider>
      )}
    </>
  );
}

export default Page;
