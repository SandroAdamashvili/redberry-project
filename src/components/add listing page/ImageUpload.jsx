import { forwardRef } from "react";
import UploadIcon from "../../assets/icons/plus-circle.svg";
import RemoveIcon from "../../assets/icons/remove-icon.svg";

const ImageUpload = forwardRef(function ImageUpload(
  { selectedFile, handleImgChange, onChooseFile, imgValue, onRemove },
  ref
) {
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
          onChange={handleImgChange}
        />
      )}

      <button
        className="w-full border border-dashed border-[#2D3648] h-[120px] rounded-lg flex items-center justify-center"
        onClick={onChooseFile}
      >
        {imgValue ? (
          // inputValue.selectedFile.name
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
    </div>
  );
});

export default ImageUpload;
