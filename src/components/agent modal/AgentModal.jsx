import { useEffect, useRef, useState } from "react";
import AgentInput from "./AgentInput";
import AgentImage from "./AgentImage";

export default function ({ open, closeModal }) {
  const dialog = useRef();
  const imgRef = useRef();
  const [imgBase64, setImgBase64] = useState(null);
  const [agentInfo, setAgentInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: null,
  });

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function handleChange(name, value) {
    setAgentInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleImgChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
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

  console.log(agentInfo);

  return (
    <dialog ref={dialog} className="modal">
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
              />
              <AgentInput
                title="გვარი *"
                inputName="surname"
                validationText="მინიმუმ ორი სიმბოლო"
                onInputChange={handleChange}
              />
            </div>
            <div className="flex flex-row w-full gap-5">
              <AgentInput
                title="ელ-ფოსტა *"
                inputName="email"
                validationText="გამოიყენეთ @redberry.ge ფოსტა"
                onInputChange={handleChange}
              />
              <AgentInput
                title="ტელეფონის ნომერი *"
                inputName="phone"
                validationText="მხოლოდ რიცხვები"
                onInputChange={handleChange}
              />
            </div>
            <AgentImage
              ref={imgRef}
              imgValue={imgBase64}
              handleImgChange={handleImgChange}
              onChooseFile={onChooseFile}
              onRemove={onRemove}
            />
          </div>
          <div className="mt-[94px] w-full flex flex-row justify-end gap-[15px]">
            <button
              className="px-4 py-[10px] border border-[#F93B1D] rounded-[10px] text-[#F93B1D] font-semibold hover:bg-[#F93B1D] hover:text-white"
              onClick={(e) => {
                closeModal();
                e.preventDefault();
              }}
            >
              გაუქმება
            </button>
            <button className="px-4 py-[10px] border bg-[#F93B1D] rounded-[10px] text-white font-semibold hover:bg-[#DF3014]">
              დაამატე ლისტინგი
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
