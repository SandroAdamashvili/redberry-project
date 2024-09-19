import LocationIcon from "../../assets/icons/location-marker.svg";
import AreaIcon from "../../assets/icons/area.svg";
import BedIcon from "../../assets/icons/bed.svg";
import ZipCodeIcon from "../../assets/icons/zip-code.svg";

export default function ListingData({
  price,
  cityName,
  address,
  area,
  bedrooms,
  zipCode,
  description,
}) {
  return (
    <div className="w-[503px] mb-[50px]">
      <h2 className="text-5xl font-bold mb-6">
        {new Intl.NumberFormat().format(price)} ₾
      </h2>
      <div className="flex flex-col gap-4 mb-[40px]">
        <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
          <img src={LocationIcon} alt="location icon" />
          <p>
            {cityName}, {address}
          </p>
        </span>
        <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
          <img src={AreaIcon} alt="area icon" />
          <p> ფართი {area} მ²</p>
        </span>
        <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
          <img src={BedIcon} alt="bed icon" />
          <p>საძინებელი {bedrooms}</p>
        </span>
        <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
          <img src={ZipCodeIcon} alt="zip code icon" />
          <p>საფოსტო ინდექსი {zipCode}</p>
        </span>
      </div>
      <p className="w-full h-fit text-[#808A93] text-base font-normal text-wrap">
        {description}
      </p>
    </div>
  );
}
