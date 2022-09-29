import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === "GET") {
		const response = await supabase
			.from("reservation")
			.select("id, service_type, service_date, service_time, event_status");
		res.json(response);
	} else if (req.method === "POST") {
		const eventBody = req.body;
		const response = await supabase.from("reservation").insert(eventBody);
		res.json(response);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
