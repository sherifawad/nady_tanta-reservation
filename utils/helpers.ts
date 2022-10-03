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
			return { name: "منتظر تأكيد الحجز", color: "#FFFFFF" };
		case 1:
			return { name: "تم تأكيد الحجز", color: "#eab308" };
		case 2:
			return { name: "تم الحدث", color: "#22c55e" };
		case 3:
			return { name: "تم الالغاء", color: "#ef4444" };

		default:
			return { name: "", color: "bg-black" };
	}
};
