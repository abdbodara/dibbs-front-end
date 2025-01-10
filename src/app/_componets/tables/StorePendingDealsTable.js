import React, { useEffect, useState } from "react";
import { MenuTable } from "../MenuItem";
import { AiOutlinePlus } from "react-icons/ai";
import Images from "../Images";
import Pagination from "../Pagination";
import {
  deleteProduct,
  fetchPendingDeals,
  fetchProducts,
  fetchProductVariants,
  updateProductStatus,
} from "@/store/slices/dealSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

function StorePendingDealsTable({
  products,
  pagination,
  onPageChange,
  setisOpentoast,
}) {
  const [add, setAdd] = useState(null);
  const dispatch = useDispatch();
  const { variants } = useSelector((state) => state.product);
  const router = useRouter();

  const handleDeleteItem = async (productId) => {
    try {
      await dispatch(deleteProduct(productId));
      await dispatch(fetchProducts(pagination.currentPage));
      toast.success("Product deleted successfully!");
      setisOpentoast(true);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };
  const handleChangeStatus = async (productId, status) => {
    try {
      await dispatch(updateProductStatus({ productId, status }));
      dispatch(fetchPendingDeals(pagination.currentPage));
      toast.success(`Product status updated to ${status}`);
      setisOpentoast(true);
    } catch (error) {
      console.error("Update status failed:", error);
      toast.error("Failed to update product status. Please try again.");
    }
  };
  const handleToggleVariants = async (productId) => {
    setAdd((prev) => (prev === productId ? null : productId));

    if (!variants[productId]) {
      try {
        await dispatch(fetchProductVariants(productId));
        toast.success(`Variants fetched for product ID ${productId}`);
      } catch (error) {
        console.error("Failed to fetch variants:", error);
        toast.error(`Failed to fetch variants for product ID ${productId}`);
      }
    }
  };
  const handleEditItem = (id) => {
    router.push(`/admin/deals/alldeals/${id}`);
  };
  const path = usePathname();
  return (
    <>
      <div className="">
        <div className="max-w-full min-h-[57vh] overflow-x-auto">
          <table className="table display mb-4 dataTablesCard shadow-[0px_12px_23px_0px_rgba(62,_73,_84,_0.04)]">
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[222px]">
                  Deal ID
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[292px] hidden lg:table-cell">
                  Image
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[278px]">
                  Deal Info
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[173px]">
                  Description
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[259px] hidden lg:table-cell">
                  Added On
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[189px]">
                  Deal Status
                </th>
                <th className="p-[12px] text-[#211c37] text-[12px] lg:text-[15px] text-start w-[62px]">
                  Actions
                </th>
              </tr>
            </thead>
            {products?.data?.length > 0 &&
              products?.data?.map((product) => (
                <tbody key={product.product_id}>
                  <>
                    <tr
                      className={`${
                        add == product.product_id && "bg-sky "
                      } duration-400 `}
                      key={product.product_id}
                    >
                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          #{product.product_id}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="">
                          <Images
                            file={"img"}
                            name={"user.png"}
                            classname={"w-[57px] "}
                          />
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <h6 className="text-[16px] font-[600]">
                          {product.product_name}
                        </h6>
                        <span>
                          {`${product.products_variations} variants from ${product.store_name}`}
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <span className="text-[14px] text-nowrap text-ellipsis overflow-hidden max-w-[250px] font-[400]">
                          {product?.description
                            ?.split(" ")
                            .slice(0, 5)
                            .join(" ")}
                          {product?.description?.split(" ").length > 20
                            ? "..."
                            : ""}
                        </span>
                      </td>

                      <td className="p-[12px]">
                        <span className="text-[14px] font-[400]">
                          {new Date(product.added_on).toLocaleString("en-US", {
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
                        <button className="bg-green capitalize text-white text-[12px] p-[3.2px_8.12px]">
                          {product.status}
                        </button>
                      </td>

                      <td className="p-[12px]">
                        <div className="flex items-stretch">
                          <MenuTable
                            option={[
                              {
                                id: 1,
                                name:
                                  path == "/admin/deals/alldeals"
                                    ? "Delete"
                                    : "Approve",
                                onclick: () => {
                                  if (path === "/admin/deals/alldeals") {
                                    handleDeleteItem(product.product_id);
                                  } else {
                                    handleChangeStatus(
                                      product.product_id,
                                      "approve"
                                    );
                                  }
                                },
                              },
                              {
                                id: 2,
                                name:
                                  path == "/admin/deals/alldeals"
                                    ? "Edit"
                                    : "Reject",
                                onclick: () => {
                                  if (path === "/admin/deals/alldeals") {
                                    handleEditItem(product.product_id);
                                  } else {
                                    handleChangeStatus(
                                      product.product_id,
                                      "reject"
                                    );
                                  }
                                },
                              },
                            ]}
                          />

                          {add !== product?.product_id ? (
                            <AiOutlinePlus
                              onClick={() =>
                                handleToggleVariants(product.product_id)
                              }
                              className="text-xl"
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
                    {add === product?.product_id && (
                      <tr className="relative h-[120px] shadow-lg">
                        <td colSpan={11} className="p-0">
                          <div className="relative w-[90%] lg:w-[100%] mx-auto overflow-x-auto  ">
                            <table className="w-full !min-h-max table-auto border-collapse shadow-xl">
                              <thead className=" border-b">
                                <tr>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Variant ID
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Name
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Price
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Discount
                                  </th>
                                  <th className="p-4 text-left text-grey text-sm">
                                    Added On
                                  </th>
                                </tr>
                              </thead>
                              {variants[product?.product_id] &&
                                variants[product?.product_id].length > 0 &&
                                variants[product?.product_id].map((variant) => {
                                  return (
                                    <tbody key={variant.variant_id}>
                                      <tr className="border-b last:border-none">
                                        <td className="p-4">
                                          <span className="text-[14px] font-[400]">
                                            #{variant.variant_id}
                                          </span>
                                        </td>

                                        <td className="p-4 text-sm">
                                          <span className="text-[14px] font-[400]">
                                            {variant.name}
                                          </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                          <span className="text-[14px] font-[400]">
                                            $ {variant.price}
                                          </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                          <span className="text-[14px] font-[400]">
                                            $ {variant.discount}
                                          </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                          <span className="text-[14px] font-[400]">
                                            {new Date(
                                              variant.added_on
                                            ).toLocaleString("en-US", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })}
                            </table>
                            {variants?.length === 0 && (
                              <div className="p-4 text-center text-gray-500">
                                No variants found
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              ))}
          </table>
        </div>
        <Pagination
          totalItems={pagination?.totalRecords}
          itemsPerPage={pagination?.limit}
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default StorePendingDealsTable;
