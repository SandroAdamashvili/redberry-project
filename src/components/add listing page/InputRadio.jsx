export default function InputRadio({ title, onChecked, onSelect }) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        className="mr-[7px]"
        name="radio"
        checked={onChecked}
        onChange={onSelect}
      />
      <label htmlFor="radio" className="">
        {title}
      </label>
    </div>
  );
}
