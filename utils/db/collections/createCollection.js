"use server";

import addToCollection from "./addToCollection";
import addUserToCollection from "./addUserToCollection";
import { v4 as uuidv4 } from "uuid";
import supabase from "../clients/admin/supabase";

const createCollection = async (
  collectionName,
  privacy,
  userId,
  isAdmin,
  lookId
) => {
  let isLookSaved;
  let isUserAssociated;

  const { data: collectionData, error: collectionError } = await supabase
    .from("collections")
    .insert([{ name: collectionName, privacy: privacy, share_id: uuidv4() }])
    .select()
    .single();

  if (!collectionData || collectionError) {
    console.log(collectionError);
    return false;
  }

  if (lookId) isLookSaved = await addToCollection(collectionData.id, lookId);
  if (lookId && !isLookSaved) return false;

  if (userId)
    isUserAssociated = await addUserToCollection(
      collectionData.id,
      userId,
      isAdmin
    );
  if (userId && !isUserAssociated) return false;

  if (collectionData && (!lookId || isLookSaved) && isUserAssociated)
    return true;
};

export default createCollection;
