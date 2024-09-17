import { forwardRef, useEffect } from "react";
import UploadIcon from "../../assets/icons/plus-circle.svg";
import RemoveIcon from "../../assets/icons/remove-icon.svg";
import Tick from "../../assets/icons/tick.svg";

const AgentImage = forwardRef(function AgentImage(
  {
    imgValue,
    handleImgChange,
    onChooseFile,
    onRemove,
    onValidation,
    validationFn,
    error,
    selectedFile,
  },
  ref
) {
  function handleChange(event) {
    handleImgChange(event);
    // onValidation();
    // onValidation("avatar", event.target.value, validationFn);
  }

  console.log(error);
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="imgUpload"
        className="text-[14px] font-medium text-[#021526]"
      >
        ატვირთეთ ფოტო *
      </label>
      {imgValue === null && (
        <input
          type="file"
          className=" hidden"
          ref={ref}
          onChange={handleChange}
        />
      )}

      <button
        className="w-full border border-dashed border-[#2D3648] h-[120px] rounded-lg flex items-center justify-center"
        onClick={onChooseFile}
      >
        {imgValue ? (
          <div className="relative">
            <img
              src={imgValue}
              alt="image"
              className="w-[92px] h-[82px] rounded-[4px]"
            />
            <img
              src={RemoveIcon}
              alt="remove icon"
              className="absolute top-[65px] left-[75px]"
              onClick={onRemove}
            />
          </div>
        ) : (
          <img src={UploadIcon} alt="upload icon" />
        )}
      </button>
      {error && (
        <label
          htmlFor="imgUpload"
          className="text-[14px] font-normal flex flex-row gap-1 text-[#F93B1D]"
        >
          <img src={Tick} alt="tick icon" />
          ატვირთეთ ვალიდური სურათი. სურათი არ უნდა აღემატებოდეს 1mb-ს
        </label>
      )}
    </div>
  );
});

export default AgentImage;
