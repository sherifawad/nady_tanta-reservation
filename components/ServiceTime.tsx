import { format, parse } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ServiceTimeProps, ServiceTypes } from "../types";

function ServiceTime({ formState, setFormState }: ServiceTimeProps) {
	const Calendar = dynamic(() => import("react-calendar"), {
		ssr: false,
	});

	const hours = [
		"10:00ص",
		"11:00ص",
		"12:00م",
		"1:00م",
		"2:00م",
		"3:00م",
		"4:00م",
		"5:00م",
		"6:00م",
		"7:00م",
		"8:00م",
		"9:00م",
		"10:00م",
	];
	const PrayerDate = ["بعد العصر", " بعد المغرب", " بعد العشاء"];

	const [showPrayers, setShowPrayers] = useState(false);

	useEffect(() => {
		if (formState.serviceType === ServiceTypes.MARRIAGE) {
			setShowPrayers(true);
		} else {
			setShowPrayers(false);
		}
	}, [formState?.serviceType]);

	const timeChange = (timeValue: string) => {
		setFormState((prev) => {
			return { ...prev, serviceTime: timeValue };
		});
	};

	return (
		<div className="pb-4">
			<div className="flex flex-col">
				<h2 className="my-2 text-2xl font-bold text-[#1499B4] ">اختر التوقيت</h2>
				<div className="my-2 grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 shadow-xl bg-white rounded-lg">
					<Calendar
						onChange={(value: Date) =>
							setFormState((prev) => {
								return { ...prev, serviceDate: format(value, "yyyy-MM-dd") };
							})
						}
						value={
							formState?.serviceDate
								? parse(formState.serviceDate, "yyyy-MM-dd", new Date())
								: new Date()
						}
						className="shadow-xl rounded-xl sm:mx-0 py-4"
					/>
					<div className={`grid grid-cols-2 gap-4 m-auto ${showPrayers ? "" : "hidden"}`}>
						{PrayerDate.map((p, index) => (
							<button
								onClick={(e) => timeChange(p)}
								key={`p${index}`}
								className={`rounded-xl p-2 shadow-lg cursor-pointer self-center ${
									formState.serviceTime === p
										? "bg-yellow-500 text-white"
										: "bg-white text-blue-500"
								}`}
							>
								<span className="whitespace-nowrap">{p}</span>
							</button>
						))}
					</div>

					<div className={`grid grid-cols-4 gap-4 m-auto ${showPrayers ? "hidden" : ""}`}>
						{hours.map((h, index) => (
							<button
								onClick={(e) => timeChange(h)}
								key={`h${index}`}
								className={`rounded-xl p-2 shadow-lg cursor-pointer self-center ${
									formState.serviceTime === h
										? "bg-yellow-500 text-white"
										: "bg-white text-blue-500"
								}`}
							>
								<span className="whitespace-nowrap">{h}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ServiceTime;
