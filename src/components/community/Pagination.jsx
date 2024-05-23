import React from "react";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className=" text-gray-800 font-bold py-2 px-4">
        {currentPage} of {totalPages}
      </span>
      <button
        className=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
