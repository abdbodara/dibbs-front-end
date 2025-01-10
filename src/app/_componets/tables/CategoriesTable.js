"use client";
import React from "react";
import { MenuTable } from "../MenuItem";
import Images from "../Images";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "@/store/slices/categorySlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDrag, useDrop } from "react-dnd";

function CategoriesTable({
  pagination,
  onPageChange,
  categories,
  setCategories,
  currentPage,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId));
      await dispatch(fetchCategories(currentPage));
      toast.success(`Category deleted successfully`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = async (categoryId) => {
    router.push(`/admin/allcategories/${categoryId}`);
  };

  const moveCategory = (draggedIndex, droppedIndex) => {
    const updatedCategories = [...categories.data];
    const [draggedCategory] = updatedCategories.splice(draggedIndex, 1);
    updatedCategories.splice(droppedIndex, 0, draggedCategory);
    setCategories({ ...categories, data: updatedCategories });
  };

  const DraggableRow = ({ category, index }) => {
    const [, drag] = useDrag(() => ({
      type: "category",
      item: { index },
    }));

    const [, drop] = useDrop(() => ({
      accept: "category",
      hover: (item) => {
        if (item.index !== index) {
          moveCategory(item.index, index);
          item.index = index;
        }
      },
    }));

    return (
      <tr ref={(node) => drag(drop(node))}>
        <td className="p-[12px]">
          <span className="text-[14px] font-[400]">{category?.auto_id}</span>
        </td>
        <td className="p-[12px]">
          <span className="text-[14px] font-[400]">{category?.name}</span>
        </td>
        <td className="p-[12px]">
          <span className="text-[14px] font-[400]">
            {category?.description}
          </span>
        </td>
        <td className="p-[12px] text-[12px] lg:text-[15px] font-[500] text-black text-start w-[100%] min-w-[222px]">
          <Images
            file={"img"}
            name={"user.png"}
            classname={"w-[50px] h-auto "}
          />
        </td>
        <td className="p-[12px]">
          <span className="text-[14px] font-[400]">
            {new Date(category.added_on).toLocaleString("en-US", {
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
                  onclick: () => handleDelete(category?.auto_id),
                },
                {
                  id: 2,
                  name: "Edit",
                  onclick: () => handleEdit(category?.auto_id),
                },
              ]}
            />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div>
        <div className="min-h-[57vh] w-full overflow-x-auto">
          <table className="mb-4 shadow-[100%] shadow-custom">
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[150px]">
                  Category ID
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[292px]">
                  Category Name
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[278px]">
                  Category Description
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[259px] hidden lg:table-cell">
                  Category Image
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[173px]">
                  Added On
                </th>
                <th className="p-[12px] text-grey text-[12px] lg:text-[15px] text-start w-[100%] min-w-[62px]"></th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.map((category, index) => (
                <DraggableRow
                  key={category?.auto_id}
                  category={category}
                  index={index}
                />
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

export default CategoriesTable;
