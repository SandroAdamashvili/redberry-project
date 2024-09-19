import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";

export default function ListingAgent({
  agentAvatar,
  agentName,
  agentSurname,
  agentEmail,
  agentPhone,
}) {
  const formattedPhoneNumber = agentPhone.replace(
    /(\d{3})(\d{3})(\d{3})/,
    "$1 $2 $3"
  );

  return (
    <div className="w-[503px] h-[174px] py-6 px-5 border border-[#DBDBDB] rounded-lg flex flex-col gap-4">
      <div className="flex flex-row gap-[14px]">
        <img
          src={agentAvatar}
          alt="agent avatar"
          className="w-[72px] h-[72px] rounded-full"
        />
        <span className="flex flex-col gap-1 py-4">
          <h3 className="text-[16px] leading-[19.2px] font-normal text-[#021526]">
            {agentName} {agentSurname}
          </h3>
          <p className="text-[14px] leading-4 text-[#676E76]">აგენტი</p>
        </span>
      </div>
      <div>
        <span className="flex flex-row gap-[5px] text-[14px] text-[#808A93] font-normal">
          <img src={EmailIcon} alt="email icon" />
          <p>{agentEmail}</p>
        </span>
        <span className="flex flex-row gap-[5px] text-[14px] text-[#808A93] font-normal">
          <img src={PhoneIcon} alt="phone icon" />
          <p>{formattedPhoneNumber}</p>
        </span>
      </div>
    </div>
  );
}
