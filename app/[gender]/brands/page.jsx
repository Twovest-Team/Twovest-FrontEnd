'use client'

import React from 'react'

const page = ({params}) => {

  const currentGender = params.gender

  return (
    <div>Brands {currentGender}</div>
  )
}

export default page