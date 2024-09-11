import IconDown from "../assets/icons/icon-chevron-down.png";

export default function FilterName({ children }) {
  return (
    <button className="flex flex-row text-[16px] items-center gap-1 text-[#021526] px-[14px] py-2 font-semibold">
      {children}
      <img src={IconDown} alt="icon down" width="14px" />
    </button>
  );
}
