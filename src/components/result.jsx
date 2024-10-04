import React from "react";

const Result = ({ result }) => {
  return (
    <div className="mt-10 flex flex-col justify-center items-center text-center">
      <label>
        <h1 className="text-white">Converted Amount is:</h1>
        <span className="text-[40px] font-bold text-[#ff227a]">
          {result}
        </span>
      </label>
    </div>
  );
};

export default Result;
