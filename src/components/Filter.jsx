import FilterName from "./FilterName.jsx";
import IconPlusOrng from "../assets/icons/icon-plus-orng.svg";
import IconPlusWhite from "../assets/icons/icon-plus-white.svg";
import { fetchRegions } from "../http.js";
import { useEffect, useState } from "react";
import FilterRegion from "./FilterRegion.jsx";
import FilterNumber from "./FilterNumber.jsx";
import FilterBedroomCount from "./FilterBedroomCount.jsx";
import FilterValues from "./FilterValues.jsx";

export default function Filter() {
  const [regionsData, setRegionsData] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    region: false,
    priceCategory: false,
    area: false,
    bedroomCount: false,
  });

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

  function handleModal(filterName) {
    setModalOpen((prevStates) => {
      const newState = {};

      for (const key in prevStates) {
        if (key === filterName) {
          newState[key] = !prevStates[filterName];
        } else {
          newState[key] = false;
        }
      }

      return newState;
    });
  }

  // console.log(regionsData);
  // console.log(modalOpen);

  return (
    <>
      <div className="w-[1596px] mt-[77px] ml-[162px] flex flex-row justify-between">
        <div className="flex flex-row gap-[24px] p-[6px] border-#DBDBDB border-[1px] rounded-[10px] w-fit">
          <div>
            <FilterName
              onClick={() => handleModal("region")}
              clicked={modalOpen.region}
            >
              რეგიონი
            </FilterName>
            {modalOpen.region && (
              <FilterRegion
                regionsData={regionsData}
                onSelect={() => handleModal("region")}
              />
            )}
          </div>
          <div>
            <FilterName
              onClick={() => handleModal("priceCategory")}
              clicked={modalOpen.priceCategory}
            >
              საფასო კატეგორია
            </FilterName>
            {modalOpen.priceCategory && (
              <FilterNumber
                symbol="₾"
                title="ფასის მიხედვით"
                indicator="ფასი"
                onSelect={() => handleModal("priceCategory")}
              />
            )}
          </div>
          <div>
            <FilterName
              onClick={() => handleModal("area")}
              clicked={modalOpen.area}
            >
              ფართობი
            </FilterName>
            {modalOpen.area && (
              <FilterNumber
                symbol="მ²"
                title="ფართობის მიხედვით"
                indicator="ფართობი"
                onSelect={() => handleModal("area")}
              />
            )}
          </div>
          <div>
            <FilterName
              onClick={() => handleModal("bedroomCount")}
              clicked={modalOpen.bedroomCount}
            >
              საძინებლის რაოდენობა
            </FilterName>
            {modalOpen.bedroomCount && (
              <FilterBedroomCount
                onSelect={() => handleModal("bedroomCount")}
              />
            )}
          </div>
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
      <FilterValues />
    </>
  );
}
