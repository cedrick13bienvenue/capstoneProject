import React from "react";

const Dropdown = ({ values, onchange }) => {
  return (
    <div className="w-full">
      <select
        className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff227a] cursor-pointer"
        onChange={onchange}
      >
        {values.map((op, index) => (
          <option className="text-black" key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
