import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const eventId = req.query.id;
	const eventBody = req.body;
	if (req.method === "DELETE") {
		const response = await supabase.from("reservation").delete().match({ id: eventId });
		res.json(response);
	} else if (req.method === "POST") {
		const response = await supabase.from("reservation").insert(eventBody);
		res.json(response);
	} else if (req.method === "UPDATE") {
		const response = await supabase.from("reservation").update(eventBody).match({ id: eventId });
		res.json(response);
	} else if (req.method === "GET") {
		const response = await supabase.from("reservation").select("*").match({ id: eventId }).single();
		res.json(response);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
