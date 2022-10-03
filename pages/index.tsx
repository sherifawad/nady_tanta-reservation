// import { useUser } from "@supabase/supabase-auth-helpers/react";
import axios from "axios";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import useModel from "../hooks/useModel";
import { HomePageProps, ServiceTypes } from "../types";
import { getURL, statusConversion } from "../utils/helpers";
import { RiDeleteBin6Line } from "react-icons/ri";
import useLoading from "../hooks/useLoading";
import { useRouter } from "next/router";
import { useUser } from "../components/common/CustomUserProvider";

export async function loadEvents() {
	try {
		const { data: { data } = {} } = await axios({
			method: "GET",
			url: `${getURL()}/api/events`,
		});

		return data;
	} catch (error) {
		// console.log("🚀 ~ file: index.tsx ~ line 23 ~ loadEvents ~ error", error);
	}

	return null;
}

const HomePage = ({ eventsList = [] }: HomePageProps) => {
	const Calendar = dynamic(() => import("react-calendar"), {
		ssr: false,
	});

	const router = useRouter();

	const { setLoading, LoadingModel } = useLoading();

	const { Model, modelProps, setIsOpened } = useModel();
	const [eventId, setEventId] = useState<number | undefined>(0);

	const [events, _] = useState(eventsList);

	const { accessToken } = useUser();

	const [value, onChange] = useState(new Date());

	const setClass = (date: Date) => {
		const dateHasEvent = events.find((x) => {
			return (
				x.service_date &&
				date.getDay() === new Date(x.service_date).getDay() &&
				date.getMonth() === new Date(x.service_date).getMonth() &&
				date.getDate() === new Date(x.service_date).getDate()
			);
		});
		if (!dateHasEvent || !dateHasEvent.service_type) {
			return "";
		}
		return serviceTypeColor(dateHasEvent.service_type as ServiceTypes);
	};

	// const dateEqualityCheck = (date: string) => {
	// 	return value.toLocaleDateString() === new Date(date).toLocaleDateString();
	// };

	const serviceTypeColor = (serviceType: ServiceTypes | string | null) => {
		switch (serviceType) {
			case ServiceTypes.BIRTHDAY:
				return "!bg-cyan-300";
			case ServiceTypes.CEIL:
				return "!bg-pink-500";
			case ServiceTypes.CONFERENCE:
				return "!bg-blue-500";
			case ServiceTypes.MARRIAGE:
				return "!bg-fuchsia-500";

			default:
				return "";
		}
	};

	const deleteEvent = async () => {
		setLoading(true);
		if (isNaN(Number(eventId))) return;
		try {
			const res = await axios({
				method: "DELETE",
				url: `/api/events/${eventId}`,
			});
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				// error is string
				alert(error);
			}
		}
		router.reload();
	};

	const eventItemLink = useMemo(() => {
		return function eventItem({ eventItem }: any) {
			const name = statusConversion(eventItem.event_status)?.name;
			const backGroundColor = statusConversion(eventItem.event_status)?.color || "bg-white";
			return (
				<Link href={`/${eventItem.id}`}>
					<a>
						<div
							className={` grid grid-cols-1 divide-y text-white gap-2 rounded-lg shadow-xl border p-4 ${serviceTypeColor(
								eventItem.service_type
							)}`}
						>
							<div className="text-center">{eventItem.service_type}</div>
							<div className="text-center">{eventItem.service_time}</div>
							<div className="flex text-center justify-center items-center gap-2 ">
								<button className={` w-4 h-4 mbs-2 rounded-full ${backGroundColor}`}>
									{" "}
								</button>
								<div>{name}</div>
							</div>
						</div>
					</a>
				</Link>
			);
		};
	}, []);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="p-10 flex flex-col gap-4 justify-center items-center ">
				<LoadingModel />
				<Model title="هل تريد ازالة تفاصيل الحجز نهائيا؟">
					<div className="flex justify-evenly items-center">
						<button
							className="border-solid border-2 border-red-500 text-red-500 rounded-xl p-2"
							onClick={() => deleteEvent()}
						>
							إزالة
						</button>
						<button
							className="border-solid border-2 border-green-900 text-green-900 rounded-xl p-2"
							onClick={modelProps.onClose}
						>
							إلغاء
						</button>
					</div>
				</Model>
				<Calendar
					className="w-96 h-full rounded-xl shadow-xl "
					tileClassName={({ date }) => setClass(date)}
					value={value}
					onChange={onChange}
				/>

				<div className="flex flex-wrap justify-center gap-2 items-center">
					{events?.map(
						(eventItem, index) =>
							eventItem.service_date && (
								<div
									key={index}
									className={`flex flex-col justify-center items-center ${
										format(value, "yyyy-MM-dd") === eventItem.service_date ? "" : "hidden"
									}`}
								>
									{eventItemLink({ eventItem })}
									{accessToken && (
										<div
											className="text-red-500  rounded-full shadow-md cursor-pointer"
											onClick={() => {
												setEventId(eventItem.id);
												setIsOpened(true);
											}}
										>
											<RiDeleteBin6Line />
										</div>
									)}
								</div>
							)
					)}
				</div>
				{accessToken && (
					<Link href={"/0"}>
						<a className="flex shadow-xl justify-center items-center w-1/2 rounded-xl bg-yellow-500 p-4 text-white">
							اضف حجز جديد
						</a>
					</Link>
				)}
				{/* <pre>{JSON.stringify(eventsList, null, 2)}</pre> */}
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const data = (await loadEvents()) ?? [];
		return {
			props: { eventsList: data },
		};
	} catch (error) {
		return {
			props: {},
		};
	}
};

export default HomePage;
