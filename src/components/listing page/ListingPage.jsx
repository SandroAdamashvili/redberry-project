import { SwiperSlide } from "swiper/react";
import BackIcon from "../../assets/icons/back-icon.svg";
import XIcon from "../../assets/icons/icon-x.svg";
import ListingImage from "./ListingImage.jsx";
import ListingData from "./ListingData.jsx";
import ListingAgent from "./ListingAgent.jsx";
import Slider from "./Slider.jsx";
import RealEstates from "../main page/RealEstates.jsx";
import { useEffect, useState, useRef } from "react";

export default function ListingPage({
  data,
  onBack,
  onDelete,
  realEstatesData,
  onSelect,
}) {
  const dialog = useRef();
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (deleteModal) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });

  console.log(data);

  return (
    <div>
      <dialog ref={dialog} className="modal w-[623px] h-[222px] p-0">
        <span className="flex justify-end">
          <img
            src={XIcon}
            alt="x icon"
            className="w-[24px] h-[24px] mr-[25px] mt-[25px] mb-[10px] hover:cursor-pointer"
            onClick={() => setDeleteModal(false)}
          />
        </span>
        <div className="w-full flex flex-col justify-center items-center gap-[35px]">
          <h3 className="text-[20px] font-normal">გსურთ წაშალოთ ლისტინგი?</h3>
          <div className="flex flex-row gap-[15px]">
            <button
              className="px-4 py-[10px] border border-[#F93B1D] rounded-[10px] text-[#F93B1D] font-semibold outline-none hover:bg-[#F93B1D] hover:text-white"
              onClick={() => setDeleteModal(false)}
            >
              გაუქმება
            </button>
            <button
              className="px-4 py-[10px] border bg-[#F93B1D] rounded-[10px] text-white font-semibold outline-none hover:bg-[#DF3014]"
              onClick={() => {
                setDeleteModal(false);
                onDelete(data.id);
              }}
            >
              დადასტურება
            </button>
          </div>
        </div>
      </dialog>
      <img
        src={BackIcon}
        alt="back icon"
        className="ml-[162px] mt-[64px] mb-[29px] hover:cursor-pointer"
        onClick={onBack}
      />
      <div className="w-[1591px] ml-[162px] mb-[53px] font-fira flex flex-row gap-[68px]">
        <ListingImage
          is_rental={data.is_rental}
          image={data.image}
          listingDate={data.created_at}
        />
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
            onClick={() => setDeleteModal(true)}
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
                    cityName={element.city.name}
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
