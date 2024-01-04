'use client'

import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const ItemsBox = ({children}) => {


  const currentView = useAppSelector(state => state.layoutViews.currentValue)

  return (
    <div className={`container my-6 flex justify-center ${!currentView || currentView === 1 ? 'flex-col' : currentView === 2 && 'flex-row'} items-center gap-6 `}>
        {children}
    </div>
  )
}

export default ItemsBox