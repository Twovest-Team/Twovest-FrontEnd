'use client'

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IconButton from "../buttons/icons/IconButton";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import ManageCollectionsModal from "./ManageCollectionsModal";


export default function SaveLookButton({ lookId, whiteMode }) {

  const dispatch = useAppDispatch()

  return (
    <>
      <IconButton
        icon={<BookmarkBorderOutlinedIcon className={whiteMode ? 'text-white' : 'text-black'} sx={{ fontSize: 30 }} />}
        onClick={() => dispatch(openModal('createCollection'))}
      />
    </>
  )

}
