import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function updateCollectionName(collectionId, newName) {
  const supabase = createClientComponentClient();

  if (newName.trim().length > 0) {
    const { data, status, error } = await supabase
      .from("collections")
      .update({ name: newName })
      .eq("id", collectionId)
      .select();

    if (error) return { error };
    if (data && status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
