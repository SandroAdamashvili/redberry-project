import IconDown from "../../assets/icons/icon-chevron-down.svg";
import IconUp from "../../assets/icons/icon-chevron-up.svg";

export default function FilterName({ children, clicked, ...props }) {
  const cssClass =
    "flex flex-row text-[16px] items-center gap-1 text-[#021526] px-[14px] py-2 font-semibold rounded-[6px]";

  return (
    <button
      {...props}
      className={clicked ? cssClass + " bg-[#F3F3F3]" : cssClass}
    >
      {children}
      <img src={clicked ? IconUp : IconDown} alt="icon down" width="14px" />
    </button>
  );
}
