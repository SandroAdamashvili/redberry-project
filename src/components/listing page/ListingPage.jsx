import { SwiperSlide } from "swiper/react";
import BackIcon from "../../assets/icons/back-icon.svg";
import ListingImage from "./ListingImage.jsx";
import ListingData from "./ListingData.jsx";
import ListingAgent from "./ListingAgent.jsx";
import Slider from "./Slider.jsx";
import RealEstates from "../main page/RealEstates.jsx";

export default function ListingPage({
  data,
  onBack,
  onDelete,
  realEstatesData,
  onSelect,
}) {
  console.log(data);

  return (
    <div>
      <img
        src={BackIcon}
        alt="back icon"
        className="ml-[162px] mt-[64px] mb-[29px] hover:cursor-pointer"
        onClick={onBack}
      />
      <div className="w-[1591px] ml-[162px] mb-[53px] font-fira flex flex-row gap-[68px]">
        <ListingImage image={data.image} listingDate={data.created_at} />
        <div>
          <ListingData
            price={data.price}
            cityName={data.city.name}
            address={data.address}
            area={data.area}
            bedrooms={data.bedrooms}
            zipCode={data.zip_code}
            description={data.description}
          />
          <ListingAgent
            agentAvatar={data.agent.avatar}
            agentName={data.agent.name}
            agentSurname={data.agent.surname}
            agentEmail={data.agent.email}
            agentPhone={data.agent.phone}
          />
          <button
            onClick={() => onDelete(data.id)}
            className="mt-5 p-[10px] border border-[#676E76] rounded-lg text-[12px] leading-[14.4px] w-fit text-[#676E76] font-bold focus:outline-none hover:bg-[#676E76] hover:text-white"
          >
            ლისტინგის წაშლა
          </button>
        </div>
      </div>
      <div>
        <h2 className="ml-[162px] mb-[52px] text-[32px] text-[#021526] font-medium">
          ბინები მსგავს ლოკაციაზე
        </h2>
        <Slider>
          {realEstatesData.map((element) => {
            return (
              element.city_id === data.city.id &&
              element.id !== data.id && (
                <SwiperSlide key={element.id}>
                  <RealEstates
                    onClick={() => onSelect(element.id)}
                    image={element.image}
                    price={element.price}
                    cityId={element.city.id}
                    address={element.address}
                    bedrooms={element.bedrooms}
                    area={element.area}
                    zipCode={element.zip_code}
                  />
                </SwiperSlide>
              )
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
