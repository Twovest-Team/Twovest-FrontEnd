import Link from "next/link"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Select from "../items/Select";
import { cttPickupPoints, portugalDistricts, portugalTowns } from "@/constants";
import PhoneInput from "../inputs/PhoneInput";
import Notifications from "../modals/Notifications";

const ShopSectionTwo = ({ userData, updateStage }) => {

  const [steps, setSteps] = useState([
    {
      step: 'Dados de faturação',
      confirmed: true
    },
    {
      step: 'Ponto de recolha',
      confirmed: false
    }
  ])

  const [selectedDistrict, setSelectedDistrict] = useState(portugalDistricts[0])
  const [selectedTown, setSelectedTown] = useState(portugalTowns[0])
  const [selectedCTT, setSelectedCTT] = useState(cttPickupPoints[0])
  const [showNotification, setShowNotification] = useState(false)

  function handleStep(boolean) {
    //console.log(boolean)
    setSteps(prevState => {
      const newState = [...prevState];
      newState[1] = { ...newState[1], confirmed: boolean };
      return newState;
    });
  }

  function handleForm(e) {
    e.preventDefault()
    handleStep(true)
  }

  function handleNextStage() {
    const areAllStepsConfirmed = steps.every((step) => step.confirmed);
    if (areAllStepsConfirmed) {
      updateStage(3)
    } else {
      setShowNotification(!showNotification)
      setTimeout(() => {
        setShowNotification(false)
      }, 3200)
    }
  }

  return (
    <>
      <section className=" flex flex-col gap-8 mb-8 container">

        <div className="flex flex-col gap-4">

          <div className="font-semibold flex gap-2 items-center">
            <h6 className="flex gap-2 items-center">Dados de faturação</h6>

            {steps[0].confirmed &&
              <CheckOutlinedIcon className="text-primary_main text-[24px]" />
            }
          </div>


          <div className={`rounded flex justify-between items-center border border-grey container py-6 relative`}>
            <div className="flex flex-col flex-grow min-w-0">
              <p className="font-semibold truncate">{userData.email}</p>
              <p className="caption text-secondary">Sem NIF associado</p>
            </div>

            {steps[0].confirmed &&
              <CreateOutlinedIcon className="text-[22px] cursor-pointer" />
            }


          </div>


        </div>

        <div className="flex flex-col gap-4">

          <div className="font-semibold flex gap-2 items-center">
            <h6 className="flex gap-2 items-center">Ponto de recolha</h6>

            {steps[1].confirmed &&
              <CheckOutlinedIcon className="text-primary_main text-[24px]" />
            }
          </div>


          <div className="flex flex-col gap-4 border border-grey container py-7">
            <form onSubmit={(e) => handleForm(e)} className="flex flex-col gap-4 rounded">


              <div className={`${steps[1].confirmed && 'pointer-events-none opacity-60'} flex flex-col gap-4`}>
                <Select data={portugalDistricts} state={selectedDistrict} setState={setSelectedDistrict} defaultValue={'Distrito'} />
                <Select data={portugalTowns} state={selectedTown} setState={setSelectedTown} defaultValue={'Concelho'} />
                <Select data={cttPickupPoints} state={selectedCTT} setState={setSelectedCTT} defaultValue={'Ponto de Recolha'} />

                <PhoneInput />
              </div>

              {!steps[1].confirmed && (
                <button
                  className="block text-center py-3.5 font-semibold rounded border-2 border-black bg-dark text-white"
                  type="submit"
                >
                  Confirmar recolha
                </button>
              )}


            </form>

            {steps[1].confirmed && (
              <button
                type="button"
                className="block text-center py-3.5 font-semibold rounded border-2 border-black"
                onClick={() => handleStep(false)}
              >
                Alterar
              </button>
            )}

          </div>

        </div>


        <button disabled={showNotification ? true : false}
        onClick={handleNextStage}
        className="bg-primary_main block text-center text-white py-3.5 font-semibold rounded">
          Efetuar pagamento
        </button>

      </section >

      {showNotification && <Notifications type={'Error'} message={'Preenche todos os campos'} />}
    </>
  )
}

export default ShopSectionTwo