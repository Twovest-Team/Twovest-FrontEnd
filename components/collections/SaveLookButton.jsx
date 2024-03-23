'use client'

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IconButton from "../buttons/icons/IconButton";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SaveLookButton({ lookId, whiteMode }) {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const getLookParam = searchParams.get('save')

  useEffect(() => {
    if (getLookParam == lookId) dispatch(openModal('createCollection'))
  }, [searchParams])

  function handleCLick() {
    if (getLookParam == lookId) {
      dispatch(openModal('createCollection'))
    }else{
      router.push(pathname + '?save=' + lookId, { scroll: false })
    }
  }

  return (
    <>
      <IconButton
        icon={<BookmarkBorderOutlinedIcon className={whiteMode ? 'text-white' : 'text-black'} sx={{ fontSize: 30 }} />}
        darkMode={whiteMode}
        onClick={handleCLick}
      />
    </>
  )

}
