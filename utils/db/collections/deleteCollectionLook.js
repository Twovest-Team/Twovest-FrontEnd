"use server";

import supabase from "../clients/admin/supabase";

export default async function deleteCollectionLook(collectionId, lookId) {
  const { error } = await supabase
    .from("collections_has_looks")
    .delete()
    .eq("id_look", parseInt(lookId))
    .eq("id_collection", parseInt(collectionId))
    .single();

  if (error) return false;

  return true;
}
