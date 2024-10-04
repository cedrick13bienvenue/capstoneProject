import React from "react";

const Input = ({ label, onchange }) => {
  return (
    <div className="w-full">
      <input className='w-full px-[20px] py-[10px] border-[#ff227a] outline-none text-white bg-transparent border-2 rounded-[10px] mb-10' onChange={onchange} placeholder={label} required="true" />
    </div>
  );
};

export default Input;
