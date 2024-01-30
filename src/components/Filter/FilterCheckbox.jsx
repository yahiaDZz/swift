import React from "react";

const FilterCheckbox = ({ label }) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="rounded focus:outline-none" />
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
};

export default FilterCheckbox;
