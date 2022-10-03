import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import { getURL } from "../../utils/helpers";

type Data = {
	status: number;
	message?: string;
	success: boolean;
	data: any | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === "POST") {
		try {
			const { email } = req.body;
			const { error, data } = await supabase.auth.api.sendMagicLinkEmail(email, {
				redirectTo: getURL(),
			});
			if (error) {
				// console.log("🚀 ~ file: signin.ts ~ line 17 ~ handler ~ error", error);
				throw error;
			}
			return res.status(200).send({ status: 200, success: true, data });
		} catch (error) {
			// console.log("🚀 ~ file: signin.ts ~ line 22 ~ handler ~ error", error);
			if (error instanceof Error) {
				return res
					.status(500)
					.send({ status: 500, message: error.message, success: false, data: null });
			}
			return res
				.status(500)
				.send({ status: 500, message: error as string, success: false, data: null });
		}
	} else {
		return res
			.status(500)
			.send({
				status: 500,
				message: `The HTTP ${req.method} method is not supported at this route.`,
				success: false,
				data: null,
			});
	}
}
