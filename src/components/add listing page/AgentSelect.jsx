import { useState } from "react";
import PlusCircleIcon from "../../assets/icons/plus-circle.svg";
import DownArrowIcon from "../../assets/icons/icon-chevron-down.svg";

export default function CustomDropdown({
  inputName,
  label,
  title,
  data,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(inputName, value);
    localStorage.setItem(inputName, value);
    setIsOpen(false);
  };

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
          className="border border-gray-400 rounded-md h-10 w-full flex items-center justify-between px-3 bg-white text-gray-800 focus:outline-none"
        >
          <span>
            {data.map((element) => {
              return localStorage.getItem(inputName) == element.id
                ? element.name
                : `აირჩიე ${title}`;
            })}
          </span>
          <img src={DownArrowIcon} alt="down arrow" className="w-4 h-4" />
        </button>
        {isOpen && (
          <ul className="absolute left-0 w-full border border-gray-400 rounded-md bg-white mt-1 shadow-lg z-10">
            <li
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect("add-agent")}
            >
              <img
                src={PlusCircleIcon}
                alt="plus-circle icon"
                className="w-5 h-5 mr-2"
              />
              დაამატე აგენტი
            </li>
            {data.map((element) => (
              <li
                key={element.id}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                  selectedValue === element.id ? "bg-gray-200" : ""
                }`}
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
