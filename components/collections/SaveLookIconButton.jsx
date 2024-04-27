"use client";

import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IconButton from "../buttons/icons/IconButton";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/client-hooks/useAuth";

export default function SaveLookIconButton({ lookId, whiteMode }) {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const iconProps = {
    className: whiteMode ? "text-white" : "text-black",
    sx: { fontSize: 30 }
  }

  const saveParam = searchParams.get("save");
  const { currentUser } = useAuth();

  const isSaved = currentUser && isLookSaved(currentUser.collections, lookId)

  useEffect(() => {
    if (currentUser && saveParam == lookId)
      openCollectionsModal()
  }, [currentUser, searchParams]);

  function handleRedirect() {
    if (currentUser && !saveParam) router.push("?save=" + lookId, { scroll: false });
    if (!currentUser) router.push('/login')
  }
  function openCollectionsModal() {
    dispatch(openModal("createCollection"));
  }

  return (
    <IconButton
      icon={isSaved ? <BookmarkRoundedIcon {...iconProps} /> : <BookmarkBorderOutlinedIcon {...iconProps} />}
      darkMode={whiteMode}
      onClick={handleRedirect}
      ariaLabel="Guardar este look"
    />
  );
}


function isLookSaved(collections, id) {
  for (const collection of collections) {
    if (collection.looks && collection.looks.length > 0) {
      for (const look of collection.looks) {
        const lookId = parseInt(look.id);
        if (lookId == id) {
          return true;
        }
      }
    }
  }
  return false;
}