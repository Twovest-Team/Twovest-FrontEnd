'use client'

import { useAppDispatch } from '@/redux/hooks'
import { updateGender } from '@/redux/slices/gendersSlice'

const page = () => {

    const dispatch = useAppDispatch()

  return (
    <div>
        <p onClick={() => dispatch(updateGender('Homem'))} className='bg-blue-400'>Homem</p>
        <p onClick={() => dispatch(updateGender('Mulher'))}className='bg-red-400'>Mulher</p>
    </div>
  )
}

export default page