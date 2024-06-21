import supabase from "@/utils/db/clients/public/supabase";

const getCollectionMembers = async (collectionId) => {
  try {
    const { data, error } = await supabase
      .from("collections_has_users")
      .select(
        `
          is_admin,
          users (
            id,
            name,
            email,
            img
          )
        `
      )
      .eq("id_collection", collectionId)

    function transformData(members) {
      return members.map(member => ({
        is_admin: member.is_admin,
        id: member.users.id,
        name: member.users.name,
        email: member.users.email,
        img: member.users.img
      }));
    }

    if (error) {
      console.log(error);
      return { error };
    }

    if (data) {
      return transformData(data);
    }

  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getCollectionMembers;
