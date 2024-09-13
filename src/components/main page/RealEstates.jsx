import { useState, useEffect } from "react";
import { fetchRealEstates } from "../../http.js";
import MapIcon from "../../assets/icons/location-marker.svg";
import BedIcon from "../../assets/icons/bed.svg";
import areaIcon from "../../assets/icons/vector.svg";
import ZipCodeIcon from "../../assets/icons/zip-code.svg";

export default function RealEstates() {
  const [realEstateData, setRealEstateData] = useState([]);

  useEffect(() => {
    async function fetchRealEstateData() {
      try {
        const realEstate = await fetchRealEstates();
        setRealEstateData(realEstate);
      } catch (error) {
        console.error("Error fetching real-estates data:", error);
      }
    }
    fetchRealEstateData();
  }, []);

  console.log(realEstateData);

  return (
    <ul className="mx-[162px] mt-8 flex flex-row flex-wrap gap-5">
      {realEstateData.map((element) => (
        <li
          key={element.id}
          className="w-[384px] border border-[#DBDBDB] rounded-[14px] hover:shadow-[#02152614]  hover:shadow-lg hover:cursor-pointer"
        >
          <img
            src={element.image}
            alt="real estate image"
            className="h-[307px] rounded-t-[14px]"
          />
          <div className="px-[25px] py-[22px]">
            <h1 className="text-[28px] text-[#021526] font-bold">
              {element.price} ₾
            </h1>
            <span className="flex flex-row text-[#021526B2] font-normal text-base gap-[0.5px] mb-5">
              <img src={MapIcon} alt="map icon" />
              {element["city_id"]}, {element.address}
            </span>
            <div className="flex flex-row gap-8 text-[#021526B2] font-normal">
              <span className="flex flex-row gap-[5px]">
                <img src={BedIcon} alt="bed icon" />
                {element.bedrooms}
              </span>
              <span className="flex flex-row gap-[5px]">
                <img src={areaIcon} alt="area icon" width="18px" />
                {element.area}
              </span>
              <span className="flex flex-row gap-[5px]">
                <img src={ZipCodeIcon} alt="zip-code icon" />
                {element["zip_code"]}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
