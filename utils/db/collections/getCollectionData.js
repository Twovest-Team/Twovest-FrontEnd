import { supabase } from "@/utils/db/supabase";
import getCollectionLooks from "./getCollectionLooks";
import getCollectionMembers from "./getCollectionMembers";

const getCollectionData = async (collectionId) => {


  try {

    const { data: collectionData, error: collectionError } = await supabase
      .from("collections")
      .select(
        `
      id,
      name,
      privacy,
      share_id
  `
      )
      .eq("id", collectionId)
      .single();

    if(!collectionData) return null

    const { data: looksData, error: looksError } = await getCollectionLooks(collectionId);
    if (looksError) throw looksError
    collectionData.allLooks = looksData


    const { data: membersData, error: membersError } = await getCollectionMembers(collectionId)
    if (membersError) throw membersError
    collectionData.members = membersData


    return collectionData

  } catch (error) {
    console.log(error)
    return (error)
  }

};

export default getCollectionData;
