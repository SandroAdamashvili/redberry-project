import Tick from "../../assets/icons/tick.svg";

export default function Input({ title, validationText, inputType }) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="input" className="text-[14px] font-medium text-[#021526]">
        {title}
      </label>
      {inputType === "textarea" ? (
        <textarea
          name="input"
          className=" border border-[#808A93] rounded-md h-[135px] w-full focus:outline-none p-[10px]"
        ></textarea>
      ) : (
        <input
          type={inputType}
          name="input"
          className=" border border-[#808A93] rounded-md h-[42px] w-[384px] focus:outline-none p-[10px]"
        />
      )}
      <label
        htmlFor="input"
        className="text-[14px] font-normal text-[#021526] flex flex-row gap-1"
      >
        <img src={Tick} alt="tick icon" />
        {validationText}
      </label>
    </div>
  );
}
