import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Spinner from "../components/Spinner";
import { getURL } from "../utils/helpers";

const Auth: NextPage = () => {
	const [email, setEmail] = useState<string>();
	const [loading, setLoading] = useState<Boolean>(false);

	const { push } = useRouter();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { status, data } = await axios({
				method: "POST",
				url: `/api/signin/`,
				data: {
					email,
				},
			});
			// console.log("🚀 ~ file: auth.tsx ~ line 21 ~ handleSubmit ~ data", data);
			if (status === 200) {
				setLoading(false);

				push("/");
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				// error is string
				alert(error);
			}
		}

		setLoading(false);
	};

	const showSpinner = (loading: Boolean) => {
		return loading && <Spinner />;
	};
	return (
		<div className="border rounded-lg p-12  mx-auto my-48">
			{showSpinner(loading)}
			<h3 className="font-extrabold text-3xl">مرحبا !</h3>

			<p className="text-gray-500 text-sm mt-4">ادخل الايميل و سوف نرسل لك رابط الدخول</p>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="example@email.com"
					className="border w-full p-3 rounded-lg mt-4 focus:border-indigo-500"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					type="submit"
					className="bg-indigo-500 text-white w-full p-3 rounded-lg mt-8 hover:bg-indigo-700"
				>
					لنبدأ !
				</button>
			</form>
		</div>
	);
};

export default Auth;
