import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReservationData } from "../pages";
import { ServiceTypes } from "./ServiceItemsList";

export interface ServiceTimeProps {
	formState: ReservationData;
	setFormState: Dispatch<SetStateAction<ReservationData>>;
}

function ServiceTime({ formState, setFormState }: ServiceTimeProps) {
	const Calendar = dynamic(() => import("react-calendar"), {
		ssr: false,
	});

	const [value, onChange] = useState(new Date());
	const hours = [4, 5, 6, 7, 8, 9, 10, 11, 12];
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

	useEffect(() => {
		setFormState((prev) => {
			return { ...prev, serviceDate: value.toLocaleDateString() };
		});
	}, [setFormState, value]);

	return (
		<div className="pb-4">
			<div className="flex flex-col">
				<h2 className="my-2 text-2xl font-bold text-[#1499B4] ">اختر التوقيت</h2>
				<div className="my-2 grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 shadow-xl bg-white rounded-lg">
					<Calendar
						onChange={onChange}
						value={value}
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

					<div className={`grid grid-cols-3 gap-4 m-auto ${showPrayers ? "hidden" : ""}`}>
						{hours.map((h, index) => (
							<button
								onClick={(e) => timeChange(h.toString())}
								key={`h${index}`}
								className={`rounded-xl p-2 shadow-lg cursor-pointer self-center ${
									formState.serviceTime === h.toString()
										? "bg-yellow-500 text-white"
										: "bg-white text-blue-500"
								}`}
							>
								<span className="whitespace-nowrap">{`${h}:00 م`}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ServiceTime;
