import Tick from "../../assets/icons/tick.svg";

export default function Input({
  title,
  validationText,
  inputType,
  onInputChange,
  inputName,
  validationFn,
  error,
}) {
  function handleChange(event) {
    onInputChange(inputName, event.target.value, validationFn);
    localStorage.setItem(inputName, event.target.value);
  }

  let labelCss = "text-[14px] font-normal flex flex-row gap-1 ";
  let inputCss =
    "border rounded-md h-[42px] w-[384px] focus:outline-none p-[10px] ";
  let txtAreaCss =
    "border rounded-md h-[135px] w-full focus:outline-none p-[10px] ";

  if (error) {
    labelCss += "text-[#F93B1D]";
    inputCss += "border-[#F93B1D]";
    txtAreaCss += "border-[#F93B1D]";
  } else if (error === false) {
    labelCss += "text-[#45A849]";
  } else {
    labelCss += "text-[#021526]";
    inputCss += "border-[#808A93]";
    txtAreaCss += "border-[#808A93]";
  }

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputName}
        className="text-[14px] font-medium text-[#021526]"
      >
        {title}
      </label>
      {inputType === "textarea" ? (
        <textarea
          name={inputName}
          className={txtAreaCss}
          onChange={handleChange}
          value={
            localStorage.getItem(inputName) === null
              ? ""
              : localStorage.getItem(inputName)
          }
        ></textarea>
      ) : (
        <input
          type={inputType}
          name={inputName}
          className={inputCss}
          onChange={handleChange}
          value={
            localStorage.getItem(inputName) === null
              ? ""
              : localStorage.getItem(inputName)
          }
        />
      )}
      <label htmlFor={inputName} className={labelCss}>
        <img src={Tick} alt="tick icon" />
        {validationText}
      </label>
    </div>
  );
}
