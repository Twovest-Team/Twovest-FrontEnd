import { supabase } from "@/utils/db/supabase";
import getLookForCollectionCard from "./getLookForCollectionCard";
import getUsersForCollectionCard from "./getUsersForCollectionCard";

const getCollectionsForCard = async (id_user) => {
  const { data, error } = await supabase
    .from("collections_has_users")
    .select(
      `
    id_collection,
    is_admin,
    collections(
        name,
        privacy
    )
`
    )
    .eq("id_user", id_user);


  if(data && data.length > 0){
    let transformedData = await Promise.all(
      data.map(async (element) => {
        let array = element;
        const looks = await getLookForCollectionCard(element.id_collection);
        const users = await getUsersForCollectionCard(
          element.id_collection,
          id_user
        );
        array.looks = looks;
        array.users = users;
  
        return array;
      })
    );

    if(transformedData){
      return transformedData;
    }
  }else if(error){
    console.log(error);
  }
  

};

export default getCollectionsForCard;
