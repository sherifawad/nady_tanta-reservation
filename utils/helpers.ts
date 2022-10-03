export const getURL = () => {
	const url =
		process?.env?.URL && process.env.URL !== ""
			? process.env.URL
			: process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ""
			? process.env.VERCEL_URL
			: "http://localhost:3000";
	return url.includes("http") ? url : `https://${url}`;
};

export const statusConversion = (status: Number) => {
	if (isNaN(Number(status))) return { name: "", color: "!bg-black" };
	switch (status) {
		case 0:
			return { name: "منتظر تأكيد الحجز", color: "!bg-white" };
		case 1:
			return { name: "تم تأكيد الحجز", color: "!bg-yellow-500" };
		case 2:
			return { name: "تم الحدث", color: "!bg-green-500" };
		case 3:
			return { name: "تم الالغاء", color: "!bg-red-500" };

		default:
			return { name: "", color: "bg-black" };
	}
};
