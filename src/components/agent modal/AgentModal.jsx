import { useEffect, useRef } from "react";
import AgentInput from "./AgentInput";

export default function ({ open }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className="modal">
      {open ? (
        <div className="flex flex-col items-center justify-center text-[#021526] font-fira font-semibold ">
          <h1 className="text-[32px] mb-[61px]">აგენტის დამატება</h1>
          <div className="flex flex-col gap-[28px]">
            <div className="flex flex-row w-full gap-5">
              <AgentInput
                title="სახელი *"
                inputName="name"
                validationText="მინიმუმ ორი სიმბოლო"
              />
              <AgentInput
                title="გვარი *"
                inputName="surname"
                validationText="მინიმუმ ორი სიმბოლო"
              />
            </div>
            <div className="flex flex-row w-full gap-5">
              <AgentInput
                title="ელ-ფოსტა *"
                inputName="email"
                validationText="გამოიყენეთ @redberry.ge ფოსტა"
              />
              <AgentInput
                title="ტელეფონის ნომერი *"
                inputName="phone number"
                validationText="მხოლოდ რიცხვები"
              />
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
