'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateView } from '@/redux/slices/layoutViews';

const ItemsBox = ({ children, fixedView }) => {

  const dispatch = useAppDispatch()
  const currentView = useAppSelector(state => state.layoutViews.currentValue)
  if (fixedView) dispatch(updateView(fixedView))

  console.log(currentView)

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${currentView}, minmax(0, 1fr))`
      }}
      className={`container mb-16 grid justify-center items-center gap-4 flex-wrap`}>
      {children}
    </div>
  )
}

export default ItemsBox