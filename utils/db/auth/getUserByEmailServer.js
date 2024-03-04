import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getUserByEmailServer() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
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
