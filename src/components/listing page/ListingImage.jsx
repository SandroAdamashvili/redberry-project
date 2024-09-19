export default function ListingImage({ image, listingDate }) {
  const date = new Date(listingDate);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const formattedDate = formatter.format(date);

  return (
    <div className="w-[839px] flex flex-col gap-[11px]">
      <img
        src={image}
        alt="listing image"
        className="w-[839px] h-[670px] rounded-t-[14px]"
      />
      <span className="w-full flex justify-end gap-[10px] text-[#808A93] font-normal text-base">
        <p>გამოქვეყნების თარიღი</p>
        <p>{formattedDate}</p>
      </span>
    </div>
  );
}
