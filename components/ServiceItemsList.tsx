import { SERVFAIL } from "dns";
import { Dispatch, SetStateAction } from "react";
import { ReservationData } from "../pages";
import ServiceItem from "./ServiceItem";

export interface ServiceItemsListProps {
	formState: ReservationData;
	setFormState: Dispatch<SetStateAction<ReservationData>>;
}

export enum ServiceTypes {
	CEIL = "حجز الرووف",
	CONFERENCE = "حجز قاعة المؤتمرات",
	BIRTHDAY = "حجز عيد ميلاد",
	MARRIAGE = "حجز عقد قرآن",
}

function ServiceItemsList({ formState, setFormState }: ServiceItemsListProps) {
	const cardClickHandler = (serviceValue: string): void => {
		setFormState((prev) => {
			return { ...prev, serviceType: serviceValue };
		});
	};
	return (
		<div className="flex flex-col">
			<h2 className="my-2 text-2xl font-bold text-[#1499B4]">اختر الخدمة</h2>

			<div className="my-2 sm:grid grid-cols-1 gap-8 sm:grid-cols-2 ">
				<ServiceItem
					title={ServiceTypes.CONFERENCE}
					subTitle={""}
					ServiceValue={ServiceTypes.CONFERENCE}
					cardClickHandler={cardClickHandler}
					selectedService={formState.serviceType}
				/>
				<ServiceItem
					title={ServiceTypes.BIRTHDAY}
					subTitle={""}
					ServiceValue={ServiceTypes.BIRTHDAY}
					cardClickHandler={cardClickHandler}
					selectedService={formState.serviceType}
				/>
				<ServiceItem
					title={ServiceTypes.CEIL}
					subTitle={""}
					ServiceValue={ServiceTypes.CEIL}
					cardClickHandler={cardClickHandler}
					selectedService={formState.serviceType}
				/>
				<ServiceItem
					title={ServiceTypes.MARRIAGE}
					subTitle={""}
					ServiceValue={ServiceTypes.MARRIAGE}
					cardClickHandler={cardClickHandler}
					selectedService={formState.serviceType}
				/>
			</div>
		</div>
	);
}

export default ServiceItemsList;
