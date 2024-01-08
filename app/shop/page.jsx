'use client'

import NavigationTitle from "@/components/providers/NavigationTitle"
import ShopSectionOne from "@/components/sections/ShopSectionOne"
import ShopSectionThree from "@/components/sections/ShopSectionThree"
import ShopSectionTwo from "@/components/sections/ShopSectionTwo"
import { shopStages } from "@/constants"
import { useEffect, useState } from "react"

// Esta página é onde deve ocorrer o processo de compra nas suas diversas fases
const Shop = () => {

  const [stageState, setStageState] = useState()

  function updateStage(id){
    setStageState(shopStages.find(stage => stage.id === id))
  }

  useEffect(() => {
    setStageState(shopStages[0])
  }, [])


  return (
    <main>
      <NavigationTitle titleText={stageState && stageState.name}>
      </NavigationTitle>

      {stageState &&
        <section className=" flex flex-col gap-8 min-h-[calc(100vh-148px)]">

          <div className="container">
            <div className="flex justify-between font-semibold [&>*:first-child]:items-start [&>*:last-child]:items-end">
              {shopStages.map((stage) =>
                <div key={stage.id} className="flex flex-col flex-1 items-center relative">
                  <div className={`flex flex-col gap-3
                  ${stage.id === 1 ? 'items-start' :
                      stage.id === 2 ? 'items-center' :
                        stage.id === 3 && 'items-end'
                    }`}>
                    <span key={stage.id}>{stage.name}</span>
                    <div className={`w-2.5 h-2.5 ${stage.id === stageState.id ? 'bg-black' : 'bg-grey'}  rounded-full z-30`} />
                    <div className="h-px border-1.5 left-0 right-0 w-full bg-grey absolute bottom-1"></div>
                  </div>
                </div>
              )}
            </div>
          </div>


          {
            stageState.id === 1 ?
              <ShopSectionOne updateStage={updateStage} />
              :
              stageState.id === 2 ?
                <ShopSectionTwo updateStage={updateStage} />
                :
                stageState.id === 3 &&
                <ShopSectionThree updateStage={updateStage} />
          }

        </section>
      }

    </main>
  )
}



export default Shop