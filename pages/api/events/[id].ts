import { getUser } from "@supabase/supabase-auth-helpers/nextjs";
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	try {
		const { error } = await supabase.auth.api.getUserByCookie(req, res);
		if (error) throw Error("Could not get user");
		const eventId = req.query.id;
		const eventBody = req.body;
		if (req.method === "DELETE") {
			const response = await supabase.from("reservation").delete().match({ id: eventId });
			return res.json(response);
		} else if (req.method === "PUT") {
			const response = await supabase.from("reservation").update(eventBody).match({ id: eventId });
			return res.json(response);
		} else if (req.method === "GET") {
			const response = await supabase.from("reservation").select("*").match({ id: eventId }).single();
			return res.json(response);
		} else {
			throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
		}
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).send({ status: 500, message: error.message, success: false });
		}
		return res.status(500).send({ status: 500, message: error as string, success: false });
	}
};

export default handler;
