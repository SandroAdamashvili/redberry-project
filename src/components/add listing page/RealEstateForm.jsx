import { useState, useEffect } from "react";
import Tick from "../../assets/icons/tick.svg";
import Input from "./Input.jsx";
import InputSelect from "./InputSelect.jsx";
import InputRadio from "./inputRadio.jsx";
import { fetchcities, fetchRegions } from "../../http.js";

export default function RealEstateForm() {
  const [selectedRadio, setSelectedRadio] = useState("forSale");
  const [regionsData, setRegionsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("აირჩიე რეგიონი");
  const [selectedcity, setSelectedCity] = useState("აირჩიე ქალაქი");

  useEffect(() => {
    async function fetchRegionsData() {
      try {
        const regions = await fetchRegions();
        setRegionsData(regions);
      } catch (error) {
        console.error("Error fetching regions data:", error);
      }
    }
    fetchRegionsData();
  }, []);

  useEffect(() => {
    async function fetchCitiesData() {
      try {
        const cities = await fetchcities();
        setCitiesData(cities);
      } catch (error) {
        console.error("Error fetching regions data:", error);
      }
    }
    fetchCitiesData();
  }, []);

  console.log(citiesData);

  function handleRadioChange(value) {
    setSelectedRadio(value);
  }

  function handleRegionChange(value) {
    setSelectedRegion(value);
  }

  function handlecityChange(value) {
    setSelectedCity(value);
  }

  console.log("selected region", selectedRegion);
  console.log("selected city", selectedcity);

  return (
    <div className="mx-auto w-[790px] flex flex-col justify-center my-[62px]">
      <h1 className=" text-center mb-[61px] text-[32px] text-[#021526] font-medium">
        ლისტინგის დამატება
      </h1>
      <form>
        <div>
          <h2 className="mb-2 text-[16px] font-medium text-[#1A1A1F]">
            გარიგების ტიპი *
          </h2>
          <div className="flex flex-row gap-[84px] text-[14px]">
            <InputRadio
              title="იყიდება"
              onChecked={selectedRadio === "forSale"}
              onSelect={() => handleRadioChange("forSale")}
            />
            <InputRadio
              title="ქირავდება"
              onChecked={selectedRadio === "forRent"}
              onSelect={() => handleRadioChange("forRent")}
            />
          </div>
        </div>
        <div className="mt-[80px] flex flex-col gap-[22px]">
          <h2 className="text-[16px] font-medium text-[#1A1A1F]">მდებარეობა</h2>
          <div className="flex flex-row w-full gap-5">
            <Input
              title="მისამართი *"
              validationText="მინიმუმ 2 სიმბოლო"
              inputType="text"
            />
            <Input
              title="საფოსტო ინდექსი *"
              validationText="მხოლოდ რიცხვები"
              inputType="number"
            />
          </div>
          <div className="flex flex-row w-full gap-5">
            <InputSelect
              title="რეგიონი *"
              data={regionsData}
              onSelect={handleRegionChange}
            />
            {selectedRegion !== "აირჩიე რეგიონი" && (
              <InputSelect
                title="ქალაქი *"
                data={citiesData.filter(
                  (city) => city["region_id"] == selectedRegion
                )}
                onSelect={handlecityChange}
              />
            )}
          </div>
        </div>
        <div className="mt-[80px] flex flex-col gap-[22px]">
          <h2 className="text-[16px] font-medium text-[#1A1A1F]">
            ბინის დეტალები
          </h2>
          <div className="flex flex-row w-full gap-5">
            <Input
              title="ფასი *"
              validationText="მხოლოდ რიცხვები"
              inputType="number"
            />
            <Input
              title="ფართობი *"
              validationText="მხოლოდ რიცხვები"
              inputType="number"
            />
          </div>
          <Input
            title="საძინებლების რაოდენობა *"
            validationText="მხოლოდ რიცხვები"
            inputType="number"
          />
          <Input
            title="აღწერა *"
            validationText="მინიმუმ ხუთი სიტყვა"
            inputType="textarea"
          />
        </div>
      </form>
    </div>
  );
}
