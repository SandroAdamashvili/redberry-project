import Tick from "../../assets/icons/tick.svg";

export default function Input({
  title,
  validationText,
  inputType,
  onValidation,
  inputName,
  validationFn,
  error,
  onInputChange,
}) {
  function handleChange(event) {
    onValidation(inputName, event.target.value, validationFn);
    onInputChange(inputName, event.target.value);
    localStorage.setItem(inputName, event.target.value);
  }

  function handleFocus() {
    error = JSON.parse(localStorage.getItem("valueError"));
    // JSON.parse(localStorage.getItem("valueError"))[inputName] !==
    //   (null || "") &&
    //   onValidation(
    //     inputName,
    //     JSON.parse(localStorage.getItem("valueError"))[inputName],
    //     validationFn
    //   );
    // console.log("focus mocus");
    // console.log(error);
  }

  let labelCss = "text-[14px] font-normal flex flex-row gap-1 ";
  let inputCss =
    "border rounded-md h-[42px] w-[384px] focus:outline-none p-[10px] ";
  let txtAreaCss =
    "border rounded-md h-[135px] w-full focus:outline-none p-[10px] ";

  if (error[inputName]) {
    labelCss += "text-[#F93B1D]";
    inputCss += "border-[#F93B1D]";
    txtAreaCss += "border-[#F93B1D]";
  } else if (error[inputName] === false) {
    labelCss += "text-[#45A849]";
    inputCss += "border-[#808A93]";
    txtAreaCss += "border-[#808A93]";
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
          // onFocus={handleChange}
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
          onFocus={handleFocus}
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
