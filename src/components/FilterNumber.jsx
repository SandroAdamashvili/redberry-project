export default function FilterNumber({ title, symbol, indicator }) {
  return (
    <div className="absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px]">
      <h1 className="mb-[24px]">{title}</h1>
      <div className="flex flex-row w-[325px] gap-[15px] mb-4">
        <div className="p-[10px] border border-[#808A93] rounded-md w-1/2 flex flex-row">
          <input
            type="number"
            placeholder="დან"
            className="w-full focus:outline-none"
          />
          <span className="pr-2">{symbol}</span>
        </div>

        <div className="p-[10px] border border-[#808A93] rounded-md w-1/2 flex flex-row">
          <input
            type="number"
            placeholder="მდე"
            className="w-full focus:outline-none"
          />
          <span className="pr-2">{symbol}</span>
        </div>
      </div>

      <div className=" flex flex-row gap-6 mb-8">
        <div className="w-[155px]">
          <h3 className="mb-3 font-medium text-[#021526]">მინ. {indicator}</h3>
          <ul className="text-[#2D3648] font-normal">
            <li>50,000 {symbol}</li>
            <li>100,000 {symbol}</li>
            <li>150,000 {symbol}</li>
            <li>200,000 {symbol}</li>
            <li>300,000 {symbol}</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-[#021526]">მაქს. {indicator}</h3>
          <ul className="text-[#2D3648] font-normal">
            <li>50,000 {symbol}</li>
            <li>100,000 {symbol}</li>
            <li>150,000 {symbol}</li>
            <li>200,000 {symbol}</li>
            <li>300,000 {symbol}</li>
          </ul>
        </div>
      </div>
      <span className="w-full flex justify-end">
        <button className="px-[14px] py-2 bg-[#F93B1D] text-white rounded-lg">
          არჩევა
        </button>
      </span>
    </div>
  );
}
