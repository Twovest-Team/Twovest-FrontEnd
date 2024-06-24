import { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Select from "../items/Select";
import { cttPickupPoints, portugalDistricts, portugalTowns } from "@/constants";
import PortugalFlag from "@/public/static/images/idiomas/portugal_idioma.svg";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { showNotification } from "@/redux/slices/notificationSlice";
import { useAppDispatch } from "@/redux/hooks";
import Button from "../buttons/Button";

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

  const dispatch = useAppDispatch()
  const [selectedDistrict, setSelectedDistrict] = useState(
    portugalDistricts[0]
  );
  const [selectedTown, setSelectedTown] = useState(portugalTowns[0]);
  const [selectedCTT, setSelectedCTT] = useState(cttPickupPoints[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleStep(boolean) {
    //console.log(boolean)
    setSteps((prevState) => {
      const newState = [...prevState];
      newState[1] = { ...newState[1], confirmed: boolean };
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
      dispatch(showNotification('formError'))
    }
  }

  return (
    <>
      <section className=" flex flex-col gap-8 mb-8 container">
        <div className="flex flex-col gap-4">
          <div className="font-semibold flex gap-2 items-center">
            <h1
              className="flex gap-2 items-center text-h6"
              ariaLabel="Dados de faturação"
            >
              Dados de faturação
            </h1>

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
                ariaLabel="Endereço de e-mail do utilizador"
              >
                {userData.email}
              </p>
              <p
                className="text-caption text-secondary"
                ariaLabel="Sem NIF associado"
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
            <h2
              className="flex gap-2 items-center text-h6"
              ariaLabel="Ponto de recolha"
            >
              Ponto de recolha
            </h2>
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
                className={`${steps[1].confirmed && "pointer-events-none opacity-60"
                  } flex flex-col gap-4`}
              >
                <Select
                  data={portugalDistricts}
                  state={selectedDistrict}
                  setState={setSelectedDistrict}
                  defaultValue={"Distrito"}
                  ariaLabel={selectedDistrict}
                />
                <Select
                  data={portugalTowns}
                  state={selectedTown}
                  setState={setSelectedTown}
                  defaultValue={"Concelho"}
                  ariaLabel={selectedTown}
                />
                <Select
                  data={cttPickupPoints}
                  state={selectedCTT}
                  setState={setSelectedCTT}
                  defaultValue={"Ponto de Recolha"}
                  ariaLabel={selectedCTT}
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
                <Button type={'black'} ariaLabel='Confirmar recolha' width='100%'>
                  Confirmar recolha
                </Button>
              )}
            </form>

            {steps[1].confirmed && (

              <Button onClick={() => handleStep(false)} type={'black-outlined'} ariaLabel='Alterar dados de recolha' width='100%'>
                Alterar
              </Button>

            )}
          </div>
        </div>

        <Button onClick={handleNextStage} type={'primary'} ariaLabel='Efetuar pagamento' width='100%'>
          Efetuar pagamento
        </Button>

      </section>

    </>
  );
};

export default ShopSectionTwo;
