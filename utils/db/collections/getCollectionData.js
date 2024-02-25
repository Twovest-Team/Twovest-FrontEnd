import { supabase } from "@/utils/db/supabase";
import getCollectionLooks from "./getCollectionLooks";
import getCollectionMembers from "./getCollectionMembers";

const getCollectionData = async (collectionId, userId) => {


  try {

    const { data: collectionData, error: collectionError } = await supabase
      .from("collections")
      .select(
        `
      id,
      name,
      privacy
  `
      )
      .eq("id", collectionId);

    const { data: looksData, error: looksError } = await getCollectionLooks(collectionId);
    if (looksError) throw looksError

    const { data: membersData, error: membersError } = await getCollectionMembers(collectionId, userId)
    if (membersError) throw membersError

    collectionData.looks = looksData
    collectionData.members = membersData

    return collectionData

  } catch (error) {
    console.log(error)
    return (error)
  }

};

export default getCollectionData;
