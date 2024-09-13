export default function InputSelect({ title, data, onSelect }) {
  function handleRegionChange(event) {
    const value = event.target.value;
    onSelect(value);
  }

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="select"
        className="text-[14px] font-medium text-[#021526]"
      >
        {title}
      </label>
      <select
        name="select"
        className=" border border-[#808A93] rounded-md h-[42px] w-[384px] focus:outline-none p-[10px]"
        onChange={handleRegionChange}
      >
        <option>აირჩიე {title}</option>
        {data.map((element) => {
          return (
            <option value={element.id} key={element.id}>
              {element.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
