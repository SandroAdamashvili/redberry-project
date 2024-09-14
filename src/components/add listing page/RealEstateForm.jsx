import { useState, useEffect, useRef } from "react";
import Input from "./Input.jsx";
import InputSelect from "./InputSelect.jsx";
import InputRadio from "./inputRadio.jsx";
import { fetchAgents, fetchcities, fetchRegions } from "../../http.js";
import {
  minFiveWords,
  minTwoSymbols,
  onlyIntegers,
  onlyNumbers,
} from "../../validation.js";
import ImageUpload from "./ImageUpload.jsx";

export default function RealEstateForm() {
  const imgRef = useRef();
  const [imgValue, setImgValue] = useState(null);
  const [regionsData, setRegionsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [inputValue, setInputValue] = useState({
    selectedRadio: "forSale",
    address: "",
    post_index: "",
    selectedRegion: "აირჩიე რეგიონი",
    selectedcity: "აირჩიე ქალაქი",
    selectedAgent: "აირჩიე აგენტი",
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    selectedFile: null,
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

  useEffect(() => {
    async function fetchAgentsData() {
      try {
        const agents = await fetchAgents();
        setAgentsData(agents);
      } catch (error) {
        console.error("Error fetching agents data:", error);
      }
    }
    fetchAgentsData();
  }, []);

  console.log(citiesData);

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
        [name]: !valueError,
      };
    });
  }

  function handleImgChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setInputValue((prevValues) => ({
        ...prevValues,
        selectedFile: event.target.files[0],
      }));
      let reader = new FileReader();
      reader.onloadend = function () {
        // setImgValue(reader.result);
        // console.log("Encoded Base 64 File String:", reader.result);
        let data = reader.result.split(",")[1];
        let binaryBlob = atob(data);
        setImgValue(binaryBlob);
        console.log("Encoded Binary File String:", binaryBlob);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onChooseFile(event) {
    event.preventDefault();
    if (inputValue.selectedFile === null) {
      imgRef.current.click();
    }
  }

  function onRemove() {
    setInputValue((prevValues) => ({
      ...prevValues,
      selectedFile: null,
    }));
    setImgValue(null);
  }

  console.log("input validation", valueError);

  console.log(inputValue);

  return (
    <div className="mx-auto w-[790px] flex flex-col justify-center my-[62px] font-fira">
      <h1 className=" text-center mb-[61px] text-[32px] text-[#021526] font-medium">
        ლისტინგის დამატება
      </h1>
      <form className="mb-[87px]">
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
              error={valueError.address}
            />
            <Input
              title="საფოსტო ინდექსი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="post_index"
              onInputChange={handleValidation}
              validationFn={onlyNumbers}
              error={valueError.post_index}
            />
          </div>
          <div className="flex flex-row w-full gap-5">
            <InputSelect
              inputName="selectedRegion"
              label="რეგიონი"
              title="რეგიონი"
              data={regionsData}
              onSelect={handleValueChange}
            />
            {inputValue.selectedRegion !== "აირჩიე რეგიონი" && (
              <InputSelect
                inputName="selectedcity"
                label="ქალაქი"
                title="ქალაქი"
                data={citiesData.filter(
                  (city) => city["region_id"] == inputValue.selectedRegion
                )}
                onSelect={handleValueChange}
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
              error={valueError.price}
            />
            <Input
              title="ფართობი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="area"
              onInputChange={handleValidation}
              validationFn={onlyNumbers}
              error={valueError.area}
            />
          </div>
          <Input
            title="საძინებლების რაოდენობა *"
            validationText="მხოლოდ რიცხვები"
            inputType="text"
            inputName="bedrooms"
            onInputChange={handleValidation}
            validationFn={onlyIntegers}
            error={valueError.bedrooms}
          />
          <Input
            title="აღწერა *"
            validationText="მინიმუმ ხუთი სიტყვა"
            inputType="textarea"
            inputName="description"
            onInputChange={handleValidation}
            validationFn={minFiveWords}
            error={valueError.description}
          />
          <ImageUpload
            ref={imgRef}
            selectedFile={inputValue.selectedFile}
            handleImgChange={handleImgChange}
            onChooseFile={onChooseFile}
            imgValue={imgValue}
            onRemove={onRemove}
          />
        </div>
        <div className="mt-[80px] flex flex-col gap-[22px]">
          <h2 className="text-[16px] font-medium text-[#1A1A1F]">აგენტი</h2>
          <div className="flex flex-row w-full gap-5">
            <InputSelect
              inputName="selectedAgent"
              label="აირჩიე"
              title="აგენტი"
              data={agentsData}
              onSelect={handleValueChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
