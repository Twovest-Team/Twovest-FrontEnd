'use client'

import ContentSlider from './ContentSlider'
import CardProduct from "./CardProduct"
import { useEffect, useState } from 'react'

const LastProductsSeen = () => {

    const [data, setData] = useState()


    if (data) {
        return (
            <div className='py-16 flex flex-col border-y border-grey'>
                <h6 className='font-semibold mb-4 container'>Últimos artigos vistos</h6>
                <ContentSlider>
                    {
                        data.map(element => (
                            <>
                                <CardProduct key={element.id} product={element} slider={true} />
                            </>
                        ))
                    }
                </ContentSlider>
            </div>
        )
    }

}

export default LastProductsSeen
