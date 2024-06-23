"use server";

import supabase from "../clients/admin/supabase";

const removeMemberFromCollection = async (collectionId, userId) => {
  const { status, error } = await supabase
    .from("collections_has_users")
    .delete()
    .eq("id_collection", collectionId)
    .eq("id_user", userId);

  if (status === 204) {
    return true;
  } else {
    console.log(error);
    return false;
  }
};

export default removeMemberFromCollection;
