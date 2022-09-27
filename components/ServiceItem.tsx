import { useEffect, useId, useState } from "react";
import { ServiceItemProps } from "../types";



function ServiceItem({ title, subTitle, ServiceValue, selectedService, cardClickHandler }: ServiceItemProps) {
	const id = useId();

	const [backGroundColor, setBackGroundColor] = useState("sm:bg-white");
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (selectedService === ServiceValue) {
			setBackGroundColor("sm:bg-yellow-500");
			setChecked(true);
		} else {
			setBackGroundColor("sm:bg-white");
			setChecked(false);
		}
	}, [selectedService, ServiceValue]);

	return (
		<div
			className={`flex flex-row items-center sm:rounded-xl p-4 sm:shadow-lg cursor-pointer ${backGroundColor}`}
			onClick={() => cardClickHandler(ServiceValue)}
		>
			<input
				onChange={() => {}}
				type="radio"
				id={id}
				value={ServiceValue}
				checked={checked}
				className="accent-[#1499B4]"
			/>

			<div className="mx-8 w-full text-right">
				<h2 className="text-[#2e3d4d] font-semibold">{title}</h2>
				<p className="mt-2 text-sm text-[#8D98A3]">{subTitle}</p>
				<div className="w-full border-b sm:border-none border-[#a9b4c0]"></div>
			</div>
		</div>
	);
}

export default ServiceItem;
