import { useState } from "react";

export default function FilterBedroomCount({
  bedroomValue,
  onSelect,
  handleBedroomChange,
}) {
  function handleBedroomFilter() {
    localStorage.setItem("bedroomCount", JSON.stringify(bedroomValue));
    onSelect();
  }

  return (
    <div className="absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px] bg-white">
      <h1 className="mb-6">საძინებლების რაოდენობა</h1>
      <input
        type="number"
        className="w-[41px] h-[42px] focus:outline-none p-[10px] border border-[#808A93] text-[#808A93] rounded-md text-center"
        onChange={handleBedroomChange}
        value={bedroomValue}
      />
      <span className="w-full flex justify-end">
        <button
          className="px-[14px] py-2 bg-[#F93B1D] text-white rounded-lg"
          onClick={handleBedroomFilter}
        >
          არჩევა
        </button>
      </span>
    </div>
  );
}
