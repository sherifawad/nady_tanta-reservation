/* eslint-disable @next/next/no-img-element */

import { useUser } from "@supabase/supabase-auth-helpers/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
	const { accessToken } = useUser();

	return (
		<div className="bg-ocean w-full flex justify-between items-center bg-blue-800">
			<Link href="http://localhost:3000/">
				<a className="py-2">
					<img src="/TantaLogo.png" className="mie-8" alt="logo" />
				</a>
			</Link>

			{accessToken ? (
				<Link href="/api/auth/logout">
					<a className="text-white font-bold hover:bg-yellow-500 hover:text-blue-800 p-0 m-0 h-16 flex justify-center items-center">
						<span className="px-4">الخروج</span>
					</a>
				</Link>
			) : (
				<Link href="http://localhost:3000/auth">
					<a className="text-white font-bold hover:bg-yellow-500 hover:text-blue-800 p-0 m-0 h-16 flex justify-center items-center">
						<span className="px-4">الدخول</span>
					</a>
				</Link>
			)}
		</div>
	);
}

export default Navbar;
