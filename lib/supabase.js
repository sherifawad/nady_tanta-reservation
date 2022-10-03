import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabase = createClient(url, anon);

// Using service key instead, which allows you to bypass RLS
export const getServiceSupabase = () => createClient(url, process.env.SUPABASE_SERVICE_KEY);
