export default function FilterRegion({ regionsData }) {
  return (
    <div className=" absolute mt-4 text-base font-medium p-6 border border-[#DBDBDB] rounded-[10px] bg-white">
      <h1 className="mb-[24px]">რეგიონის მიხედვით</h1>
      <ul className="font-normal text-[14px] h-[128px] grid grid-cols-3 gap-x-[50px] mb-8">
        {regionsData.map((region) => {
          return (
            <li key={region.id}>
              <input
                type="checkbox"
                name={region.name}
                className="mr-2 w-5 h-5 accent-[#45A849]"
              />
              <label htmlFor={region.name} className="w-[163px]">
                {region.name}
              </label>
            </li>
          );
        })}
      </ul>
      <span className="w-full flex justify-end">
        <button className="px-[14px] py-2 bg-[#F93B1D] text-white rounded-lg">
          არჩევა
        </button>
      </span>
    </div>
  );
}
