import React, { useEffect, useState } from "react";

function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalPages,
}) {
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showRange = 3;

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);

      if (activePage > showRange + 2) pageNumbers.push("...");

      const start = Math.max(2, activePage - showRange);
      const end = Math.min(totalPages - 1, activePage + showRange);
      for (let i = start; i <= end; i++) pageNumbers.push(i);

      if (activePage < totalPages - showRange - 1) pageNumbers.push("...");

      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };
  return (
    <div className="flex items-center justify-between mt-auto">
      <p className="text-grey text-[14px] font-[400]">
        Showing {(activePage - 1) * itemsPerPage + 1}-
        {Math.min(activePage * itemsPerPage, totalItems)} of {totalItems}
      </p>

      <div className="flex items-center">
        <button
          className={`min-w-[56px] min-h-[56px] text-sky font-medium grid place-content-center bg-transparent rounded-full ${
            activePage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
        >
          Prev
        </button>

        {getPageNumbers()?.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`min-w-[56px] min-h-[56px] ${
                activePage === page
                  ? "text-white bg-sky"
                  : "text-sky bg-transparent"
              } font-medium grid place-content-center rounded-full mx-[4px]`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="text-grey text-[16px] font-medium mx-[4px]"
            >
              ...
            </span>
          )
        )}

        <button
          className={`min-w-[56px] min-h-[56px] text-sky font-medium grid place-content-center bg-transparent rounded-full ${
            activePage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
