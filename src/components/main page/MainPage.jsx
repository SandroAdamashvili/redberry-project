import FilterName from "./FilterName.jsx";
import IconPlusOrng from "../../assets/icons/icon-plus-orng.svg";
import IconPlusWhite from "../../assets/icons/icon-plus-white.svg";
import { fetchRegions } from "../../http.js";
import { useEffect, useState } from "react";
import FilterRegion from "./FilterRegion.jsx";
import FilterNumber from "./FilterNumber.jsx";
import FilterBedroomCount from "./FilterBedroomCount.jsx";
import FilterValues from "./FilterValues.jsx";
import RealEstates from "./RealEstates";

export default function MainPage({ data, onSelect }) {
  const [regionsData, setRegionsData] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    region: false,
    priceCategory: false,
    area: false,
    bedroomCount: false,
  });
  const [checkedRegions, setCheckedRegions] = useState(
    localStorage.getItem("checkedRegions")
      ? JSON.parse(localStorage.getItem("checkedRegions"))
      : {}
  );
  const [bedroomValue, setBedroomValue] = useState(
    localStorage.getItem("bedroomCount")
      ? JSON.parse(localStorage.getItem("bedroomCount"))
      : ""
  );
  const [priceRange, setPriceRange] = useState(
    localStorage.getItem("ფასი")
      ? JSON.parse(localStorage.getItem("ფასი"))
      : { from: "", to: "" }
  );
  const [areaRange, setAreaRange] = useState(
    localStorage.getItem("ფართობი")
      ? JSON.parse(localStorage.getItem("ფართობი"))
      : { from: "", to: "" }
  );

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

  const handleCheck = (event) => {
    const { name, checked } = event.target;
    setCheckedRegions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  function handleRemoveRegion(name) {
    setCheckedRegions((prevRegions) => {
      const updatedRegions = { ...prevRegions, [name]: false };
      localStorage.setItem("checkedRegions", JSON.stringify(updatedRegions));
      return updatedRegions;
    });
  }

  function handleBedroomChange(event) {
    setBedroomValue(event.target.value);
  }

  function handleRemoveFilter(name) {
    // setPriceRange(priceRangeData);
    localStorage.removeItem(name);
    if (name === "ფასი") setPriceRange("");
    if (name === "ფართობი") setAreaRange("");
    if (name === "bedroomCount") setBedroomValue("");
  }

  function handleRangeChange(event, stateName) {
    const { name, value } = event.target;
    if (stateName === "ფასი") {
      setPriceRange((prevState) => ({ ...prevState, [name]: value }));
    } else if (stateName === "ფართობი") {
      setAreaRange((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  function handleFromValueSelect(num, stateName) {
    if (stateName === "₾") {
      setPriceRange((prevState) => ({ ...prevState, from: num }));
    } else if (stateName === "მ²") {
      setAreaRange((prevState) => ({ ...prevState, from: num }));
    }
  }

  function handleToValueSelect(num, stateName) {
    if (stateName === "₾") {
      setPriceRange((prevState) => ({ ...prevState, to: num }));
    } else if (stateName === "მ²") {
      setAreaRange((prevState) => ({ ...prevState, to: num }));
    }
  }

  function handleRemoveAll() {
    localStorage.clear();
    setCheckedRegions({});
    setPriceRange("");
    setAreaRange("");
    setBedroomValue("");
  }

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
                checkedRegions={checkedRegions}
                handleChange={handleCheck}
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
                valueRange={priceRange}
                handleRangeChange={handleRangeChange}
                handleFromValueSelect={handleFromValueSelect}
                handleToValueSelect={handleToValueSelect}
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
                valueRange={areaRange}
                handleRangeChange={handleRangeChange}
                handleFromValueSelect={handleFromValueSelect}
                handleToValueSelect={handleToValueSelect}
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
                bedroomValue={bedroomValue}
                onSelect={() => handleModal("bedroomCount")}
                handleBedroomChange={handleBedroomChange}
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
      <FilterValues
        regions={!modalOpen.region && checkedRegions}
        priceRange={!modalOpen.priceCategory && priceRange}
        areaRange={!modalOpen.area && areaRange}
        bedrooms={!modalOpen.bedroomCount && bedroomValue}
        handleRemoveRegion={handleRemoveRegion}
        handleRemoveFilter={handleRemoveFilter}
        handleRemoveAll={handleRemoveAll}
      />
      <div className="mx-[162px] mt-8 flex flex-row flex-wrap gap-5">
        {data.map((element) => (
          <RealEstates
            key={element.id}
            onClick={() => onSelect(element.id)}
            image={element.image}
            price={element.price}
            cityId={element.city_id}
            address={element.address}
            bedrooms={element.bedrooms}
            area={element.area}
            zipCode={element.zip_code}
          />
        ))}
      </div>
    </>
  );
}
