import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getUserData() {
  const supabase = createClientComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let userbdData;

    const { data, error } = await supabase
      .from("users")
      .select(
        `
            id,
            email,
            name,
            img,
            role
        `
      )
      .eq("email", user.user_metadata.email);

    if (data) {
      userbdData = data[0];
      return userbdData;
    } else if (error) {
      console.log(error);
    }
  }
}
