import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_ADMIN_KEY;
const supabase = createClient(url, key);
export default supabase