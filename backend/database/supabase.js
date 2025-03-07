import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY);

console.log("Supabase connected successfully");

export default supabase;
