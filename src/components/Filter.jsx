import FilterName from "./FIlterName";
import IconPlusOrng from "../assets/icons/icon-plus-orng.svg";
import IconPlusWhite from "../assets/icons/icon-plus-white.svg";
import { fetchRegions } from "../http.js";
import { useEffect, useState } from "react";

export default function Filter() {
  const [regionsData, setRegionsData] = useState([]);

  useEffect(() => {
    async function fetchRegionsData() {
      try {
        const regions = await fetchRegions();
        setRegionsData(regions);
      } catch (error) {
        console.error("Error fetching regions data:", error);
      }
    }
    fetchRegionsData();
  }, []);

  console.log(regionsData);

  return (
    <div className="w-[1596px] mt-[77px] ml-[162px] flex flex-row justify-between">
      <div className="flex flex-row gap-[24px] p-[6px] border-#DBDBDB border-[1px] rounded-[10px] w-fit">
        <div>
          <FilterName>რეგიონი</FilterName>
          <div className=" absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px]">
            <h1>რეგიონის მიხედვით</h1>
            <ul className="font-normal text-[14px]">
              {regionsData.map((region) => {
                return <li key={region.id}>{region.name}</li>;
              })}
            </ul>
          </div>
        </div>

        <FilterName>საფასო კატეგორია</FilterName>
        <FilterName>ფართობი</FilterName>
        <FilterName>საძინებლის რაოდენობა</FilterName>
      </div>
      <div className="flex flex-row gap-4">
        <button className="px-4 bg-[#F93B1D] text-white rounded-[10px] h-[47px] flex flex-row items-center gap-[2px] font-semibold">
          <img src={IconPlusWhite} alt="white plus icon" />
          ლისტინგის დამატება
        </button>
        <button className="px-4 border-[#F93B1D] border text-[#F93B1D] rounded-[10px] h-[47px] flex flex-row items-center gap-[2px] font-semibold">
          <img src={IconPlusOrng} alt="orange plus icon" />
          აგენტის დამატება
        </button>
      </div>
    </div>
  );
}
