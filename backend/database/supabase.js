import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error("❌ Missing Supabase environment variables!");
  }
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY,{
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
});
supabase.auth.onAuthStateChange((event, session) => {
    // console.log("Auth Event:", event);
    if (event === "TOKEN_REFRESHED") {
    //   console.log("✅ Token refreshed successfully");
    }
  });
console.log("Supabase connected successfully");

export default supabase;
