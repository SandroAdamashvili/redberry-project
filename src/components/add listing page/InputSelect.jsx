export default function InputSelect({
  inputName,
  label,
  title,
  data,
  onSelect,
}) {
  function handleSelectChange(event) {
    const value = event.target.value;
    onSelect(inputName, value);
    localStorage.setItem(inputName, value);
  }

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="select"
        className="text-[14px] font-medium text-[#021526]"
      >
        {label}
      </label>
      <select
        name="select"
        className=" border border-[#808A93] rounded-md h-[42px] w-[384px] focus:outline-none p-[10px]"
        onChange={handleSelectChange}
      >
        <option className="hidden">აირჩიე {title}</option>
        {data.map((element) => {
          return localStorage.getItem(inputName) == element.id ? (
            <option
              value={localStorage.getItem(inputName) ?? element.id}
              key={element.id}
              selected
            >
              {element.name}
            </option>
          ) : (
            <option value={element.id} key={element.id}>
              {element.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
