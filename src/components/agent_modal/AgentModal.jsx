import { useEffect, useRef, useState } from "react";
import AgentInput from "./AgentInput";
import AgentImage from "./AgentImage";
import { addAgent, fetchAgents } from "../../http";
import {
  emailValidation,
  minTwoSymbols,
  phoneValidation,
} from "../../validation";

export default function ({ open, closeModal, updateAgents, pageName }) {
  const dialog = useRef();
  const imgRef = useRef();
  const [imgBase64, setImgBase64] = useState(null);
  const [agentInfo, setAgentInfo] = useState({
    name: null,
    surname: null,
    email: null,
    phone: null,
    avatar: null,
  });

  const [agentError, setAgentError] = useState({
    name: null,
    surname: null,
    email: null,
    phone: null,
    avatar: agentInfo.avatar !== null && agentInfo.avatar.size > 1000000,
  });

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  async function uploadData(value) {
    let invalid = false;
    for (const key in agentError) {
      if (agentError[key] === true || agentInfo[key] === null) {
        invalid = true;
        setAgentError((prevValues) => ({
          ...prevValues,
          [key]: true,
        }));
      }
    }

    if (invalid === true) {
      return;
    }

    const fd = new FormData();
    for (const key in value) {
      fd.append(key.toString(), value[key]);
      console.log(key);
    }
    console.log(fd.get("name"));

    try {
      await addAgent(fd);

      const agents = await fetchAgents();
      pageName === "listingForm" && updateAgents(agents);
      closeModal();
    } catch (error) {
      console.error("Error uploading listing data:", error);
    }
  }

  function handleChange(name, value) {
    setAgentInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleValidation(name, enteredValue, validationFn) {
    setAgentError((prevValues) => {
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
      setAgentError((prevValues) => ({
        ...prevValues,
        avatar: file.size > 1000000 || !file.type.startsWith("image") || null,
      }));
      if (file.size < 1000000 && file.type.startsWith("image")) {
        setAgentInfo((prevValues) => ({
          ...prevValues,
          avatar: file,
        }));
        let reader = new FileReader();
        reader.onloadend = function () {
          const base64String = reader.result;
          setImgBase64(base64String);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
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
    setAgentInfo((prevValues) => ({
      ...prevValues,
      avatar: null,
    }));
  }

  return (
    <dialog ref={dialog} className="modal w-[1009px] py-[87px] px-[105px]">
      {open ? (
        <div className="flex flex-col items-center text-[#021526] font-fira">
          <h1 className="text-[32px] mb-[61px] font-semibold">
            აგენტის დამატება
          </h1>
          <div className="flex flex-col gap-[28px]">
            <div className="flex flex-row w-full gap-5">
              <AgentInput
                title="სახელი *"
                inputName="name"
                validationText="მინიმუმ ორი სიმბოლო"
                onInputChange={handleChange}
                onValidation={handleValidation}
                error={agentError.name}
                validationFn={minTwoSymbols}
              />
              <AgentInput
                title="გვარი *"
                inputName="surname"
                validationText="მინიმუმ ორი სიმბოლო"
                onInputChange={handleChange}
                onValidation={handleValidation}
                error={agentError.surname}
                validationFn={minTwoSymbols}
              />
            </div>
            <div className="flex flex-row w-full gap-5">
              <AgentInput
                title="ელ-ფოსტა *"
                inputName="email"
                validationText="გამოიყენეთ @redberry.ge ფოსტა"
                onInputChange={handleChange}
                onValidation={handleValidation}
                error={agentError.email}
                validationFn={emailValidation}
              />
              <AgentInput
                title="ტელეფონის ნომერი *"
                inputName="phone"
                validationText="მხოლოდ რიცხვები, უნდა იყოს ფორმატის 5XXXXXXXX"
                onInputChange={handleChange}
                onValidation={handleValidation}
                error={agentError.phone}
                validationFn={phoneValidation}
              />
            </div>
            <AgentImage
              ref={imgRef}
              imgValue={imgBase64}
              selectedFile={agentInfo.avatar}
              handleImgChange={handleImgChange}
              onChooseFile={onChooseFile}
              onRemove={onRemove}
              error={agentError.avatar}
            />
          </div>
          <div className="mt-[94px] w-full flex flex-row justify-end gap-[15px]">
            <button
              className="px-4 py-[10px] border border-[#F93B1D] rounded-[10px] text-[#F93B1D] font-semibold hover:bg-[#F93B1D] hover:text-white"
              onClick={(e) => {
                closeModal();
                e.preventDefault();
                Object.keys(agentError).forEach((v) =>
                  setAgentError((prevValues) => ({
                    ...prevValues,
                    [v]: null,
                  }))
                );
                setImgBase64(null);
              }}
            >
              გაუქმება
            </button>
            <button
              className="px-4 py-[10px] border bg-[#F93B1D] rounded-[10px] text-white font-semibold hover:bg-[#DF3014]"
              onClick={() => uploadData(agentInfo)}
            >
              დაამატე აგენტი
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
