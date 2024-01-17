'use client'

//Icone de guardar, com e sem preenchimento
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLookModalToggle } from "@/redux/slices/saveLookModalToggle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import getUserCollections from "@/utils/db/collections/getUserCollections";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SaveButton({ lookId }) {

  const dispatch = useAppDispatch()
  const [collections, setCollections] = useState()
  const [lookWasSavedBefore, setLookWasSavedBefore] = useState(false)
  const currentUser = useAppSelector((state) => state.user.data);
  const router = useRouter()
  lookId = parseInt(lookId)

  useEffect(() => {

    console.log('REFRESH!!')

    async function getData() {
      const userCollections = await getUserCollections(currentUser.id)
      if (userCollections) {
        setCollections(userCollections)

        const LooksIdsArray = (userCollections.map(collection => collection.looks.map(look => look.id_look))).flat();

        if (LooksIdsArray.includes(lookId)) {
          setLookWasSavedBefore(true)
        }

      }
    }

    if (currentUser && !collections) {
      getData()
    }

  }, [currentUser])

  function handleButtonClick(){
    if(!currentUser){
      router.push('/login')
    }else{
      dispatch(toggleLookModalToggle())
    }
  }


  return (
    <button onClick={handleButtonClick}>
      {lookWasSavedBefore ?
        <BookmarkIcon sx={{ fontSize: 40 }}  className="translate-x-2" /> :
        <BookmarkBorderOutlinedIcon sx={{ fontSize: 40 }}  className="translate-x-2" />
      }


    </button>
  )

}
