export default function FilterNumberValues({ onSelect, symbol }) {
  const values = [50000, 100000, 150000, 200000, 300000];

  return (
    <ul className="text-[#2D3648] font-normal">
      {values.map((value) => (
        <li
          key={value}
          onClick={() => onSelect(value)}
          className="hover:cursor-pointer"
        >
          {value.toLocaleString()} {symbol}
        </li>
      ))}
    </ul>
  );
}
