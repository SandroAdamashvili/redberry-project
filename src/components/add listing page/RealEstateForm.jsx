import { useState, useEffect, useRef } from "react";
import Input from "./Input.jsx";
import InputSelect from "./InputSelect.jsx";
import InputRadio from "./inputRadio.jsx";
import AgentSelect from "./AgentSelect.jsx";
import {
  addListing,
  fetchAgents,
  fetchcities,
  fetchRegions,
} from "../../http.js";
import {
  minFiveWords,
  minTwoSymbols,
  onlyIntegers,
  onlyNumbers,
} from "../../validation.js";
import ImageUpload from "./ImageUpload.jsx";
import AgentModal from "../agent modal/AgentModal.jsx";

export default function RealEstateForm() {
  const imgRef = useRef();
  const [imgBase64, setImgBase64] = useState(
    localStorage.getItem("imgBase64") ?? null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [regionsData, setRegionsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [inputValue, setInputValue] = useState({
    region_id: localStorage.getItem("region_id") ?? "აირჩიე რეგიონი",
    price: localStorage.getItem("price") ?? "",
    zip_code: localStorage.getItem("zip_code") ?? "",
    area: localStorage.getItem("area") ?? "",
    city_id: localStorage.getItem("city_id") ?? "აირჩიე ქალაქი",
    address: localStorage.getItem("address") ?? "",
    agent_id: localStorage.getItem("agent_id") ?? "აირჩიე აგენტი",
    bedrooms: localStorage.getItem("bedrooms") ?? "",
    is_rental: localStorage.getItem("is_rental") ?? 0,
    image: null,
    description: localStorage.getItem("description") ?? "",
  });

  const [valueError, setValueError] = useState(
    // localStorage.getItem("valueError")
    //   ? JSON.parse(localStorage.getItem("valueError"))
    //   :
    {
      address: "",
      zip_code: null,
      region: null,
      city: null,
      price: null,
      area: null,
      bedrooms: null,
      description: "",
    }
  );

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
        console.error("Error fetching cities data:", error);
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

  useEffect(() => {
    async function handleImageConversion() {
      const imageFileName = localStorage.getItem("image");
      if (imgBase64 && imageFileName) {
        try {
          const file = await dataUrlToFile(imgBase64, imageFileName);
          setInputValue((prevValues) => ({
            ...prevValues,
            image: file,
          }));
        } catch (error) {
          console.error("Error converting base64 to file:", error);
        }
      }
    }

    handleImageConversion();
  }, [imgBase64]);

  async function uploadData(value) {
    const fd = new FormData();
    for (const key in value) {
      fd.append(key.toString(), value[key]);
      console.log(key);
    }
    console.log(fd.get("address"));

    try {
      await addListing(fd);
    } catch (error) {
      console.error("Error uploading listing data:", error);
    }
  }

  async function dataUrlToFile(dataUrl, fileName) {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: "image/*" });
    return file;
  }

  function handleValueChange(name, value) {
    localStorage.setItem("valueError", JSON.stringify(valueError));
    localStorage.setItem(name, value);
    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: localStorage.getItem(name),
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
      const file = event.target.files[0];
      setInputValue((prevValues) => ({
        ...prevValues,
        image: file,
      }));
      // localStorage.getItem("image") &&
      localStorage.setItem("image", file.name);
      let reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result;
        setImgBase64(base64String);
        localStorage.setItem("imgBase64", base64String);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onChooseFile(event) {
    event.preventDefault();
    if (imgBase64 === null) {
      imgRef.current.click();
    }
  }

  function onRemove() {
    setImgBase64(null);
    setInputValue((prevValues) => ({
      ...prevValues,
      image: null,
    }));
    localStorage.removeItem("imgBase64");
    localStorage.removeItem("image");
  }

  console.log("input validation", valueError);
  console.log(inputValue);
  // console.log("selectedFile", inputValue.image);

  return (
    <div className="mx-auto w-[790px] flex flex-col justify-center mt-[62px] font-fira">
      <AgentModal open={modalOpen} />
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
              onChecked={inputValue.is_rental == 0}
              onSelect={() => handleValueChange("is_rental", 0)}
            />
            <InputRadio
              title="ქირავდება"
              onChecked={inputValue.is_rental == 1}
              onSelect={() => handleValueChange("is_rental", 1)}
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
              onValidation={handleValidation}
              inputName="address"
              validationFn={minTwoSymbols}
              error={valueError}
              onInputChange={handleValueChange}
            />
            <Input
              title="საფოსტო ინდექსი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="zip_code"
              onValidation={handleValidation}
              validationFn={onlyNumbers}
              error={valueError}
              onInputChange={handleValueChange}
            />
          </div>
          <div className="flex flex-row w-full gap-5">
            <InputSelect
              inputName="region_id"
              label="რეგიონი"
              title="რეგიონი"
              data={regionsData}
              onSelect={handleValueChange}
            />
            {inputValue.region_id !== "აირჩიე რეგიონი" && (
              <InputSelect
                inputName="city_id"
                label="ქალაქი"
                title="ქალაქი"
                data={citiesData.filter(
                  (city) => city["region_id"] == inputValue.region_id
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
              onValidation={handleValidation}
              validationFn={onlyNumbers}
              error={valueError}
              onInputChange={handleValueChange}
            />
            <Input
              title="ფართობი *"
              validationText="მხოლოდ რიცხვები"
              inputType="text"
              inputName="area"
              onValidation={handleValidation}
              validationFn={onlyNumbers}
              error={valueError}
              onInputChange={handleValueChange}
            />
          </div>
          <Input
            title="საძინებლების რაოდენობა *"
            validationText="მხოლოდ რიცხვები"
            inputType="text"
            inputName="bedrooms"
            onValidation={handleValidation}
            validationFn={onlyIntegers}
            error={valueError}
            onInputChange={handleValueChange}
          />
          <Input
            title="აღწერა *"
            validationText="მინიმუმ ხუთი სიტყვა"
            inputType="textarea"
            inputName="description"
            onValidation={handleValidation}
            validationFn={minFiveWords}
            error={valueError}
            onInputChange={handleValueChange}
          />
          <ImageUpload
            ref={imgRef}
            // selectedFile={imgFile}
            handleImgChange={handleImgChange}
            onChooseFile={onChooseFile}
            imgValue={imgBase64}
            onRemove={onRemove}
          />
        </div>
        <div className="mt-[80px] flex flex-col gap-[22px]">
          <h2 className="text-[16px] font-medium text-[#1A1A1F]">აგენტი</h2>
          <div className="flex flex-row w-full gap-5">
            <AgentSelect
              inputName="agent_id"
              label="აირჩიე"
              title="აგენტი"
              data={agentsData}
              onSelect={handleValueChange}
              openModal={() => setModalOpen(true)}
            />
          </div>
        </div>
      </form>
      <div className="mt-[80px] flex flex-row justify-end gap-[15px] mb-[87px]">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-[10px] border border-[#F93B1D] rounded-[10px] text-[#F93B1D] font-semibold hover:bg-[#F93B1D] hover:text-white"
        >
          გაუქმება
        </button>
        <button
          className="px-4 py-[10px] border bg-[#F93B1D] rounded-[10px] text-white font-semibold hover:bg-[#DF3014]"
          onClick={() => uploadData(inputValue)}
        >
          დაამატე ლისტინგი
        </button>
      </div>
    </div>
  );
}
