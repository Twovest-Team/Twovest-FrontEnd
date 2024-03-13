import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getUserByEmailServer() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
            id,
            email,
            created_at,
            name,
            img,
            role
        `
      )
      .eq("email", user.user_metadata.email)
      .single();

    if (data) {
      return data;
    } else if (error) {
      console.log(error);
    }
  }
}