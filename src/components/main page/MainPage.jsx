import Filter from "./Filter";
import RealEstates from "./RealEstates";

export default function MainPage({ data, onSelect }) {
  return (
    <>
      <Filter />
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
