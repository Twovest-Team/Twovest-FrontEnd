import Link from "next/link";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Select from "../items/Select";
import { cttPickupPoints, portugalDistricts, portugalTowns } from "@/constants";
import PhoneInput from "../inputs/PhoneInput";
import PortugalFlag from "@/public/images/idiomas/portugal_idioma.svg";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Notifications from "../modals/Notifications";
import { Buttons } from "../buttons/Buttons";
const ShopSectionTwo = ({ userData, updateStage }) => {
  const [steps, setSteps] = useState([
    {
      step: "Dados de faturação",
      confirmed: true,
    },
    {
      step: "Ponto de recolha",
      confirmed: false,
    },
  ]);

  const [selectedDistrict, setSelectedDistrict] = useState(
    portugalDistricts[0]
  );
  const [selectedTown, setSelectedTown] = useState(portugalTowns[0]);
  const [selectedCTT, setSelectedCTT] = useState(cttPickupPoints[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  function handleStep(boolean) {
    //console.log(boolean)
    setSteps((prevState) => {
      const newState = [...prevState];
      newState[1] = { ...newState[1], confirmed: boolean };
      setShowNotification(false);
      return newState;
    });
  }

  function handleForm(e) {
    e.preventDefault();
    handleStep(true);
  }
  function handlePhoneNumberChange(e) {
    const phoneNumberValue = e.target.value.trim();
    if (phoneNumberValue.length >= 9 && phoneNumberValue.length <= 12) {
      setPhoneNumber(phoneNumberValue);
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  }
  function handleNextStage() {
    const areAllStepsConfirmed = steps.every((step) => step.confirmed);
    const isDistrictSelected = !!selectedDistrict;
    const isTownSelected = !!selectedTown;
    const isCTTSelected = !!selectedCTT;
    const isPhoneNumberValid =
      phoneNumber.trim().length >= 9 && phoneNumber.trim().length <= 12;

    const isFormFilled =
      isDistrictSelected &&
      isTownSelected &&
      isCTTSelected &&
      isPhoneNumberValid;

    if (isFormFilled && areAllStepsConfirmed) {
      updateStage(3);
    } else {
      setShowNotification(true);
    }
  }

  return (
    <>
      <section className=" flex flex-col gap-8 mb-8 container">
        <div className="flex flex-col gap-4">
          <div className="font-semibold flex gap-2 items-center">
            <h6
              className="flex gap-2 items-center"
              aria-label="Dados de faturação"
            >
              Dados de faturação
            </h6>

            {steps[0].confirmed && (
              <CheckOutlinedIcon className="text-primary_main text-[24px]" />
            )}
          </div>

          <div
            className={`rounded flex justify-between items-center border border-grey container py-6 relative`}
          >
            <div className="flex flex-col flex-grow min-w-0">
              <p
                className="font-semibold truncate"
                aria-label="Endereço de e-mail do utilizador"
              >
                {userData.email}
              </p>
              <p
                className="caption text-secondary"
                aria-label="Sem NIF associado"
              >
                {userData.email}
              </p>
            </div>

            {steps[0].confirmed && (
              <CreateOutlinedIcon className="text-[22px] cursor-pointer" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-semibold flex gap-2 items-center">
            <h6
              className="flex gap-2 items-center"
              aria-label="Ponto de recolha"
            >
              Ponto de recolha
            </h6>
            {steps[1].confirmed && (
              <CheckOutlinedIcon className="text-primary_main text-[24px]" />
            )}
          </div>

          <div className="flex flex-col gap-4 border border-grey container py-7">
            <form
              onSubmit={(e) => handleForm(e)}
              className="flex flex-col gap-4 rounded"
            >
              <div
                className={`${
                  steps[1].confirmed && "pointer-events-none opacity-60"
                } flex flex-col gap-4`}
              >
                <Select
                  data={portugalDistricts}
                  state={selectedDistrict}
                  setState={setSelectedDistrict}
                  defaultValue={"Distrito"}
                  aria-label={selectedDistrict}
                />
                <Select
                  data={portugalTowns}
                  state={selectedTown}
                  setState={setSelectedTown}
                  defaultValue={"Concelho"}
                  aria-label={selectedTown}
                />
                <Select
                  data={cttPickupPoints}
                  state={selectedCTT}
                  setState={setSelectedCTT}
                  defaultValue={"Ponto de Recolha"}
                  aria-label={selectedCTT}
                />

                <div className="flex">
                  <div className="flex cursor-pointer items-center gap-1 px-4 py-4 border-l border-y rounded-l w-fit bg-grey_opacity_50 border-grey">
                    <Image
                      src={PortugalFlag}
                      alt="Bandeira de Portugal"
                      width={16}
                      height={16}
                    />
                    <KeyboardArrowDownIcon className="text-[20px]" />
                  </div>

                  <input
                    required
                    type="tel"
                    placeholder="Telemóvel"
                    onChange={handlePhoneNumberChange}
                    className="focus:outline-none pl-4 pr-4 py-4 w-full flex-grow rounded-r border-r border-y border-grey"
                  />
                </div>
              </div>

              {!steps[1].confirmed && (
                <Buttons
                  ariaLabel="Confirmar recolha"
                  btnState="blackMain"
                  text="Confirmar recolha"
                  btnSize="menuSize3"
                  type="submit"
                />
              )}
            </form>

            {steps[1].confirmed && (
              <Buttons
                ariaLabel="Alterar"
                btnState="whiteMain"
                text="Alterar"
                btnSize="menuSize3"
                onClick={() => handleStep(false)}
              />
            )}
          </div>
        </div>

        <Buttons
          ariaLabel="Efetuar pagamento"
          btnState={showNotification ? "whiteMain" : "defaultMain"}
          text="Efetuar pagamento"
          btnSize="menuSize3"
          onClick={handleNextStage}
          Disabled={showNotification}
        />
      </section>

      {showNotification && (
        <Notifications type={"Error"} message={"Preenche todos os campos"} />
      )}
    </>
  );
};

export default ShopSectionTwo;
