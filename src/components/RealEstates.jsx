import { useState, useEffect } from "react";
import { fetchRealEstates } from "../http.js";

export default function RealEstates() {
  const [realEstateData, setRealEstateData] = useState([]);

  useEffect(() => {
    async function fetchRealEstateData() {
      try {
        const realEstate = await fetchRealEstates();
        setRealEstateData(realEstate);
      } catch (error) {
        console.error("Error fetching real-estates data:", error);
      }
    }
    fetchRealEstateData();
  }, []);

  console.log(realEstateData);

  return (
    <ul className="ml-[162px] mt-8">
      {realEstateData.map((element) => (
        <li key={element.id} className="w-[384px]">
          <img
            src={element.image}
            alt="real estate image"
            className="h-[307px] rounded-t-[14px]"
          />
          <div className="px-[25px] py-[22px]">
            <h1>{element.price}</h1>
          </div>
        </li>
      ))}
    </ul>
  );
}
