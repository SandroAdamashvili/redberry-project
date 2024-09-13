import { useState, useEffect } from "react";
import Input from "./Input.jsx";
import InputSelect from "./InputSelect.jsx";
import InputRadio from "./inputRadio.jsx";
import { fetchcities, fetchRegions } from "../../http.js";
import {
  minFiveWords,
  minTwoSymbols,
  onlyIntegers,
  onlyNumbers,
} from "../../validation.js";

export default function RealEstateForm() {
  const [regionsData, setRegionsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [inputValue, setInputValue] = useState({
    selectedRadio: "forSale",
    address: "",
    post_index: null,
    selectedRegion: "აირჩიე რეგიონი",
    selectedcity: "აირჩიე ქალაქი",
    price: null,
    area: null,
    bedrooms: null,
    description: "",
  });

  const [valueError, setValueError] = useState({
    address: null,
    post_index: null,
    region: null,
    city: null,
    price: null,
    area: null,
    bedrooms: null,
    description: null,
  });

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

  function handleRegionChange(value) {
    setInputValue((prevValues) => ({
      ...prevValues,
      selectedRegion: value,
    }));
  }

  function handlecityChange(value) {
    setInputValue((prevValues) => ({
      ...prevValues,
      selectedcity: value,
    }));
  }

  function handleValueChange(name, value) {
    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleValidation(name, enteredValue, validationFn) {
    setValueError((prevValues) => {
      const valueError = validationFn(enteredValue);
      return {
        ...prevValues,
        [name]: valueError,
      };
    });
  }

  console.log("input validation", valueError);

  console.log("selected region", inputValue.selectedRegion);
  console.log("selected city", inputValue.selectedcity);

  return (
    <div className="mx-auto w-[790px] flex flex-col justify-center my-[62px] font-fira">
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
              onChecked={inputValue.selectedRadio === "forSale"}
              onSelect={() => handleValueChange("selectedRadio", "forSale")}
            />
            <InputRadio
              title="ქირავდება"
              onChecked={inputValue.selectedRadio === "forRent"}
              onSelect={() => handleValueChange("selectedRadio", "forRent")}
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
              onInputChange={handleValidation}
              inputName="address"
              validationFn={minTwoSymbols}
            />
            <Input
              title="საფოსტო ინდექსი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="post_index"
              onInputChange={handleValidation}
              validationFn={onlyNumbers}
            />
          </div>
          <div className="flex flex-row w-full gap-5">
            <InputSelect
              title="რეგიონი"
              data={regionsData}
              onSelect={handleRegionChange}
            />
            {inputValue.selectedRegion !== "აირჩიე რეგიონი" && (
              <InputSelect
                title="ქალაქი"
                data={citiesData.filter(
                  (city) => city["region_id"] == inputValue.selectedRegion
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
              inputType="text"
              inputName="price"
              onInputChange={handleValidation}
              validationFn={onlyNumbers}
            />
            <Input
              title="ფართობი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="area"
              onInputChange={handleValidation}
              validationFn={onlyNumbers}
            />
          </div>
          <Input
            title="საძინებლების რაოდენობა *"
            validationText="მხოლოდ რიცხვები"
            inputType="text"
            inputName="bedrooms"
            onInputChange={handleValidation}
            validationFn={onlyIntegers}
          />
          <Input
            title="აღწერა *"
            validationText="მინიმუმ ხუთი სიტყვა"
            inputType="textarea"
            inputName="description"
            onInputChange={handleValidation}
            validationFn={minFiveWords}
          />
        </div>
      </form>
    </div>
  );
}
