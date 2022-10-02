import { handleAuth } from "@supabase/supabase-auth-helpers/nextjs";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	// TODO Create event and session objects
// 	supabase.auth.api.setAuthCookie(req, res);
// 	// TODO Somehow pass the event down to the client (maybe just pass the exact same URL parameters as received (refresh_token, access_token, token_type)?
// 	res.redirect("/");
// }

export default handleAuth({
	logout: { returnTo: "/" },
	cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 }, // Keep the user logged in for a year.
});
