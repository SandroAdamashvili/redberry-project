import FilterItem from "./FilterItem";

export default function FilterValues({
  regions,
  priceRange,
  areaRange,
  bedrooms,
  handleRemoveRegion,
  handleRemoveFilter,
  handleRemoveAll,
}) {
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
        {priceRange.from && (
          <FilterItem
            filter={`${priceRange.from}₾ - ${priceRange.to}₾`}
            onRemove={() => handleRemoveFilter("ფასი")}
          />
        )}
        {areaRange.from && (
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
      {(Object.values(regions).includes(true) ||
        priceRange.from ||
        areaRange.from ||
        bedrooms) && <button onClick={handleRemoveAll}>გასუფთავება</button>}
    </div>
  );
}
