import XIcon from "../../assets/icons/icon-x.svg";

export default function ({ filter, onRemove, ...props }) {
  return (
    <li
      {...props}
      className="px-[10px] py-[6px] rounded-[43px] border border-[#DBDBDB] text-[#021526CC] font-[14px] flex flex-row gap-1"
    >
      {filter}
      <img
        src={XIcon}
        alt="x icon"
        onClick={onRemove}
        className="hover:cursor-pointer"
      />
    </li>
  );
}
