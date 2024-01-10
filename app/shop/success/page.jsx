import SuccessCard from '@/components/cards/SuccessCard'
import React from 'react'

const page = () => {
  return (
    <main className='h-screen bg-grey_opacity_50 flex justify-center items-center'>
        <SuccessCard>
            Parabéns!!!
        </SuccessCard>
    </main>
  )
}

export default page