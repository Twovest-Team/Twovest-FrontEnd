import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getAuth() {

    let supabase;

    supabase = createClientComponentClient();
    
    const { data: { user }} = await supabase.auth.getUser();
    
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select(
            `
                id,
                email,
                name,
                created_at,
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