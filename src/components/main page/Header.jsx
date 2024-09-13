import Logo from "../../assets/rdbr-logo.png";

export default function Header() {
  return (
    <div className="w-full h-[100px] py-[38px] px-[162px] border-[#DBDBDB] border-b-[1px]">
      <img src={Logo} alt="rdbr logo" className="w-[150px] h-[24px]" />
    </div>
  );
}
