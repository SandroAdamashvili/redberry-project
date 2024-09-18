import BackIcon from "../../assets/icons/back-icon.svg";
import LocationIcon from "../../assets/icons/location-marker.svg";
import AreaIcon from "../../assets/icons/area.svg";
import BedIcon from "../../assets/icons/bed.svg";
import ZipCodeIcon from "../../assets/icons/zip-code.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";

export default function ListingPage({ data, onBack }) {
  console.log(data);

  const date = new Date(data.created_at);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const formattedDate = formatter.format(date);

  const formattedPhoneNumber = data.agent.phone.replace(
    /(\d{3})(\d{3})(\d{3})/,
    "$1 $2 $3"
  );

  return (
    <div>
      <img
        src={BackIcon}
        alt="back icon"
        className="ml-[162px] mt-[64px] mb-[29px] hover:cursor-pointer"
        onClick={onBack}
      />
      <div className="w-[1591px] ml-[162px] font-fira flex flex-row gap-[68px]">
        <div className="w-[839px] flex flex-col gap-[11px]">
          <img
            src={data.image}
            alt="listing image"
            className="w-[839px] h-[670px] rounded-t-[14px]"
          />
          <span className="w-full flex justify-end gap-[10px] text-[#808A93] font-normal text-base">
            <p>გამოქვეყნების თარიღი</p>
            <p>{formattedDate}</p>
          </span>
        </div>
        <div>
          <div className="w-[503px] mb-[50px]">
            <h2 className="text-5xl font-bold mb-6">
              {new Intl.NumberFormat().format(data.price)} ₾
            </h2>
            <div className="flex flex-col gap-4 mb-[40px]">
              <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
                <img src={LocationIcon} alt="location icon" />
                <p>
                  {data.city.name}, {data.address}
                </p>
              </span>
              <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
                <img src={AreaIcon} alt="area icon" />
                <p> ფართი {data.area} მ²</p>
              </span>
              <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
                <img src={BedIcon} alt="bed icon" />
                <p>საძინებელი {data.bedrooms}</p>
              </span>
              <span className="flex flex-row gap-[7.3px] text-[#808A93] font-normal text-2xl">
                <img src={ZipCodeIcon} alt="zip code icon" />
                <p>საფოსტო ინდექსი {data.zip_code}</p>
              </span>
            </div>
            <p className="w-full h-fit text-[#808A93] text-base font-normal text-wrap">
              {data.description}
            </p>
          </div>
          <div className="w-[503px] h-[174px] py-6 px-5 border border-[#DBDBDB] rounded-lg flex flex-col gap-4">
            <div className="flex flex-row gap-[14px]">
              <img
                src={data.agent.avatar}
                alt="agent avatar"
                className="w-[72px] h-[72px] rounded-full"
              />
              <span className="flex flex-col gap-1 py-4">
                <h3 className="text-[16px] leading-[19.2px] font-normal text-[#021526]">
                  {data.agent.name} {data.agent.surname}
                </h3>
                <p className="text-[14px] leading-4 text-[#676E76]">აგენტი</p>
              </span>
            </div>
            <div>
              <span className="flex flex-row gap-[5px] text-[14px] text-[#808A93] font-normal">
                <img src={EmailIcon} alt="email icon" />
                <p>{data.agent.email}</p>
              </span>
              <span className="flex flex-row gap-[5px] text-[14px] text-[#808A93] font-normal">
                <img src={PhoneIcon} alt="phone icon" />
                <p>{formattedPhoneNumber}</p>
              </span>
            </div>
          </div>
          <button className="mt-5 p-[10px] border border-[#676E76] rounded-lg text-[12px] leading-[14.4px] w-fit text-[#676E76] font-bold focus:outline-none hover:bg-[#676E76] hover:text-white">
            ლისტინგის წაშლა
          </button>
        </div>
      </div>
    </div>
  );
}
