'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateView } from '@/redux/slices/layoutViews'
import React, { useEffect } from 'react'

const ItemsBox = ({children, fixedView}) => {

  const dispatch = useAppDispatch()
  const currentView = useAppSelector(state => state.layoutViews.currentValue)

  if(fixedView){
    dispatch(updateView(fixedView))
  }

  useEffect(() => {
    //console.log(currentView)
  }, [currentView])
  

  return (
    <div
     className={`container mb-16 grid justify-center ${fixedView ? `grid-cols-${fixedView}` : !currentView || currentView === 1 ? 'grid-cols-1' : currentView === 2 && 'grid-cols-2'} items-center gap-4 flex-wrap max-w-[460px]`}>
        {children}
    </div>
  )
}

export default ItemsBox