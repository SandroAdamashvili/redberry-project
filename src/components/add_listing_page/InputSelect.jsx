import { useState } from "react";
import DownArrowIcon from "../../assets/icons/icon-chevron-down.svg";

export default function AgentSelect({
  inputName,
  label,
  title,
  data,
  onSelect,
  error,
  selectValidation,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(value) {
    selectValidation();
    onSelect(inputName, value);
    localStorage.setItem(inputName, value);
    setIsOpen(false);
  }

  return (
    <div className="relative w-[384px]">
      <label
        htmlFor={inputName}
        className="text-sm font-medium text-gray-800 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className={`border ${
            error ? "border-[#F93B1D]" : "border-[#808A93]"
          } ${
            isOpen ? "rounded-t-md" : "rounded-md"
          } h-10 w-full flex items-center justify-between px-3 bg-white text-gray-800 focus:outline-none`}
        >
          <span>
            {localStorage.getItem(inputName)
              ? data.map((element) => {
                  return (
                    localStorage.getItem(inputName) == element.id &&
                    element.name
                  );
                })
              : `აირჩიე ${title}`}
          </span>
          <img src={DownArrowIcon} alt="down arrow" className="w-4 h-4" />
        </button>
        {isOpen && (
          <ul className="absolute left-0 w-full max-h-[165px] bg-white border border-[#808A93] rounded-b-md shadow-lg z-10 overflow-y-auto">
            {data.map((element) => (
              <li
                key={element.id}
                className="flex items-center p-[10px] h-[42px] cursor-pointer border border-b-[#808A93] hover:bg-gray-100"
                onClick={() => handleSelect(element.id)}
              >
                {element.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
