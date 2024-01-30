import React from "react";

const FilterInput = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );
};

export default FilterInput;
