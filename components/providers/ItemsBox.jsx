'use client'

import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const ItemsBox = ({children}) => {


  const currentView = useAppSelector(state => state.layoutViews.currentValue)

  return (
    <div className={`container mb-16 grid justify-center ${!currentView || currentView === 1 ? 'grid-cols-1' : currentView === 2 && 'grid-cols-2'} items-center gap-4 flex-wrap max-w-[460px]`}>
        {children}
    </div>
  )
}

export default ItemsBox