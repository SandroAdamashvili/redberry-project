import MapIcon from "../../assets/icons/location-marker.svg";
import BedIcon from "../../assets/icons/bed.svg";
import areaIcon from "../../assets/icons/area.svg";
import ZipCodeIcon from "../../assets/icons/zip-code.svg";

export default function RealEstates({
  is_rental,
  image,
  price,
  cityName,
  address,
  bedrooms,
  area,
  zipCode,
  ...props
}) {
  return (
    <div
      {...props}
      className="w-[384px] border border-[#DBDBDB] rounded-[14px] hover:shadow-[#02152614]  hover:shadow-lg hover:cursor-pointer"
    >
      <p className="absolute px-[10px] py-[6px] mt-[23px] ml-[23px] text-white text-[12px] bg-[#02152680] rounded-[15px] font-medium">
        {is_rental ? "იყიდება" : "ქირავდება"}
      </p>
      <img
        src={image}
        alt="real estate image"
        className="h-[307px] rounded-t-[14px]"
      />
      <div className="px-[25px] py-[22px]">
        <h1 className="text-[28px] text-[#021526] font-bold">{price} ₾</h1>
        <span className="flex flex-row text-[#021526B2] font-normal text-base gap-[0.5px] mb-5">
          <img src={MapIcon} alt="map icon" />
          {cityName}, {address}
        </span>
        <div className="flex flex-row gap-8 text-[#021526B2] font-normal">
          <span className="flex flex-row gap-[5px]">
            <img src={BedIcon} alt="bed icon" />
            {bedrooms}
          </span>
          <span className="flex flex-row gap-[5px]">
            <img src={areaIcon} alt="area icon" width="18px" />
            {area}
          </span>
          <span className="flex flex-row gap-[5px]">
            <img src={ZipCodeIcon} alt="zip-code icon" />
            {zipCode}
          </span>
        </div>
      </div>
    </div>
  );
}
