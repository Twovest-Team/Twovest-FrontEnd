'use client'

import { useEffect, useState } from "react"

const useFetch = (func) => {

  const [data, setData] = useState(null)

  useEffect(() => {

    const fetchData = async() => {
        const response = await func()
        if (response) setData(response)
    }

    if(!data) fetchData()

  }, [])

  return data
  
}

export default useFetch