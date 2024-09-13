import { useState } from "react";
import FilterNumberValues from "./FilterNumberValues";

export default function FilterNumber({ title, symbol, indicator, onSelect }) {
  function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem(indicator);
    return savedState ? JSON.parse(savedState) : { from: "", to: "" };
  }

  const [valueRange, setValueRange] = useState(loadStateFromLocalStorage);
  const [validationError, setValidationError] = useState("");

  function handleRangeFilter() {
    const fromValue = parseFloat(valueRange.from) || 0;
    const toValue = parseFloat(valueRange.to) || 0;
    if (fromValue > toValue || valueRange.from === "" || fromValue < 0) {
      setValidationError("ჩაწერეთ ვალიდური მონაცემები");
      return;
    }
    localStorage.setItem(indicator, JSON.stringify(valueRange));
    onSelect();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValueRange((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleFromValueSelect(num) {
    setValueRange((prevState) => ({ ...prevState, from: num }));
  }

  function handleToValueSelect(num) {
    setValueRange((prevState) => ({ ...prevState, to: num }));
  }

  return (
    <div className="absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px] bg-white">
      <h1 className="mb-[24px]">{title}</h1>
      <div className="flex flex-row w-[325px] gap-[15px] mb-4">
        <div className="p-[10px] border border-[#808A93] rounded-md w-1/2 flex flex-row">
          <input
            type="number"
            placeholder="დან"
            className="w-full focus:outline-none"
            name="from"
            onChange={handleChange}
            value={valueRange.from}
          />
          <span className="pr-2">{symbol}</span>
        </div>

        <div className="p-[10px] border border-[#808A93] rounded-md w-1/2 flex flex-row">
          <input
            type="number"
            placeholder="მდე"
            className="w-full focus:outline-none"
            name="to"
            onChange={handleChange}
            value={valueRange.to}
          />
          <span className="pr-2">{symbol}</span>
        </div>
      </div>

      {validationError && (
        <div className="my-4 text-red-500">{validationError}</div>
      )}

      <div className=" flex flex-row gap-6 mb-8">
        <div className="w-[155px]">
          <h3 className="mb-3 font-medium text-[#021526]">მინ. {indicator}</h3>
          <FilterNumberValues
            onSelect={handleFromValueSelect}
            symbol={symbol}
          />
        </div>
        <div>
          <h3 className="mb-3 font-medium text-[#021526]">მაქს. {indicator}</h3>
          <FilterNumberValues onSelect={handleToValueSelect} symbol={symbol} />
        </div>
      </div>
      <span className="w-full flex justify-end">
        <button
          className="px-[14px] py-2 bg-[#F93B1D] text-white rounded-lg"
          onClick={handleRangeFilter}
        >
          არჩევა
        </button>
      </span>
    </div>
  );
}
