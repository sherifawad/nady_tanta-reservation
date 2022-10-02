import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Using service key instead, which allows you to bypass RLS
export const getServiceSupabase = () =>
	createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
