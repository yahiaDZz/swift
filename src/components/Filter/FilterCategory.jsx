import React from "react";

const FilterCategory = ({ title, children }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h4 className="text-sm font-semibold text-gray-600">{title}</h4>
      {children}
    </div>
  );
};

export default FilterCategory;
