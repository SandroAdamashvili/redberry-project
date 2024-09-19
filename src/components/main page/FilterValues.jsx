import { useEffect, useState } from "react";
import FilterItem from "./FilterItem";

export default function FilterValues({ regions, handleRemoveRegion }) {
  const [priceRange, setPriceRange] = useState(null);
  const [areaRange, setAreaRange] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);

  function loadDataFromLocalStorage(name) {
    const savedState = localStorage.getItem(name);
    return savedState ? JSON.parse(savedState) : null;
  }

  const priceRangeData = loadDataFromLocalStorage("ფასი");

  useEffect(() => {
    setPriceRange(loadDataFromLocalStorage("ფასი"));
    setAreaRange(loadDataFromLocalStorage("ფართობი"));
    setBedrooms(loadDataFromLocalStorage("bedroomCount"));
  }, []);

  function handleRemoveFilter(name) {
    setPriceRange(priceRangeData);
    localStorage.removeItem(name);
    if (name === "ფასი") setPriceRange(null);
    if (name === "ფართობი") setAreaRange(null);
    if (name === "bedroomCount") setBedrooms(null);
  }

  function handleRemoveAll() {
    localStorage.clear();
    // setRegions(null);
    setPriceRange(null);
    setAreaRange(null);
    setBedrooms(null);
  }

  console.log(regions);

  return (
    <div className="flex flex-row mx-[162px] mt-4 gap-2">
      <ul className="flex flex-row gap-2">
        {regions &&
          Object.keys(regions).map((region) => {
            return (
              regions[region] && (
                <FilterItem
                  filter={region}
                  key={region}
                  onRemove={() => handleRemoveRegion(region)}
                />
              )
            );
          })}
        {priceRangeData && (
          <FilterItem
            filter={`${priceRangeData.from}₾ - ${priceRangeData.to}₾`}
            onRemove={() => handleRemoveFilter("ფასი")}
          />
        )}
        {areaRange && (
          <FilterItem
            filter={`${areaRange.from}მ² - ${areaRange.to}მ²`}
            onRemove={() => handleRemoveFilter("ფართობი")}
          />
        )}
        {bedrooms && (
          <FilterItem
            filter={bedrooms}
            onRemove={() => handleRemoveFilter("bedroomCount")}
          />
        )}
      </ul>
      <button onClick={handleRemoveAll}>გასუფთავება</button>
    </div>
  );
}
