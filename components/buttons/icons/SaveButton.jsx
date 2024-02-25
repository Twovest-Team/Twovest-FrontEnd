'use client'

//Icone de guardar, com e sem preenchimento
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLookModalToggle } from "@/redux/slices/saveLookModalToggle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import getAllCollections from "@/utils/db/collections/getAllCollections";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SaveToCollectionModal from "@/components/modals/SaveToCollectionModal";


export default function SaveButton({ lookId }) {

  const dispatch = useAppDispatch()
  const [collections, setCollections] = useState()
  const [loading, setLoading] = useState(false)
  const [lookWasSavedBefore, setLookWasSavedBefore] = useState(false)
  const toggleModal = useAppSelector(state => state.lookModalToggle.isOpen)
  const currentUser = useAppSelector((state) => state.user.data);
  const router = useRouter()
  lookId = parseInt(lookId)


  async function getData() {
    setLoading(true)
    const userCollections = await getAllCollections(currentUser.id)
    if (userCollections) {
      setCollections(userCollections)

      const LooksIdsArray = (userCollections.map(collection => collection.looks.map(look => look.id_look))).flat();

      if (LooksIdsArray.includes(lookId)) {
        setLookWasSavedBefore(true)
      }else{
        setLookWasSavedBefore(false)
      }

      setLoading(false)

    }
  }

  useEffect(() => {

    if (currentUser && !collections && !loading) {
      getData()
    }

  }, [currentUser])

  useEffect(() => {
    if (currentUser && !loading){
      getData()
    }
  }, [toggleModal])


  function handleButtonClick() {
    if (!currentUser) {
      router.push('/login')
    } else {
      dispatch(toggleLookModalToggle())
    }
  }
  


  return (
    <>
      <button onClick={handleButtonClick}>
        {lookWasSavedBefore ?
          <BookmarkIcon sx={{ fontSize: 40 }} className="translate-x-2" /> :
          <BookmarkBorderOutlinedIcon sx={{ fontSize: 40 }} className="translate-x-2" />
        }

      </button>

    </>

  )

}
