import { useState } from "react";

export default function FilterBedroomCount({
  bedroomValue,
  onSelect,
  handleBedroomChange,
}) {
  const [validationError, setValidationError] = useState(false);

  function handleBedroomFilter() {
    if (bedroomValue < 0 && Math.floor(bedroomValue) !== bedroomValue) {
      setValidationError(true);
      return;
    }
    localStorage.setItem("bedroomCount", JSON.stringify(bedroomValue));
    onSelect();
  }

  return (
    <div className="absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px] bg-white z-10">
      <h1 className="mb-6">საძინებლების რაოდენობა</h1>
      <input
        type="number"
        className="w-[41px] h-[42px] focus:outline-none p-[10px] border border-[#808A93] text-[#808A93] rounded-md text-center"
        onChange={handleBedroomChange}
        value={bedroomValue}
      />
      {validationError && (
        <p className="my-4 text-red-500">შეიყვანეთ ვალიდური მონაცემები</p>
      )}
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
