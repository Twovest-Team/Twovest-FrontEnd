import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const handleUsers = async (user) => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    /* console.log(user) */
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("email")
        .eq("email", user.email);

      if (data.length === 0 && !error) {
        if (user.picture == null) {
          user.picture = "/users/default/default.png";
        }

        if (user.provider == "" || user.provider == null) {
          user.provider == "Google";
        }

        await supabase
          .from("users")
          .insert(
            { name: user.full_name, img: user.picture, email: user.email, provider: user.provider },
            { returning: "minimal" }
          );
      }
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default handleUsers;