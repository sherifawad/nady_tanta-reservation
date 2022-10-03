/* eslint-disable @next/next/no-img-element */

// import { useUser } from "@supabase/supabase-auth-helpers/react";
import Link from "next/link";
import { useUser } from "./CustomUserProvider";

function Navbar() {
	const { accessToken } = useUser();

	return (
		<nav className="bg-ocean w-full flex justify-between items-center bg-blue-800">
			<Link href="/">
				<a className="py-2 flex flex-col justify-center items-center">
					<img src="/TantaLogo.png" className="mie-8" alt="logo" />
					<p className="text-yellow-500 font-bold">موقع غير رسمي</p>
				</a>
			</Link>

			{accessToken ? (
				<Link href="/api/auth/logout">
					<a className="text-white font-bold hover:bg-yellow-500 hover:text-blue-800 p-0 m-0 h-16 flex justify-center items-center">
						<span className="px-4">الخروج</span>
					</a>
				</Link>
			) : (
				<Link href="/auth">
					<a className="text-white font-bold hover:bg-yellow-500 hover:text-blue-800 p-0 m-0 h-16 flex justify-center items-center">
						<span className="px-4">الدخول</span>
					</a>
				</Link>
			)}
		</nav>
	);
}

export default Navbar;
