'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const ItemsBox = ({children}) => {

  const searchParams = useSearchParams()

  const currentView = searchParams.get('view')

  return (
    <div className={`container my-6 flex justify-center ${!currentView || currentView === '1' ? 'flex-col' : currentView === '2' && 'flex-row'} items-center gap-6 `}>
        {children}
    </div>
  )
}

export default ItemsBox