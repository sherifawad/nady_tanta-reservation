import { Dispatch, SetStateAction } from "react";

export interface ReservationData {
	clientDetails: {
		id: string;
		email: string;
		name: string;
		phone: string;
		memberShipCode: string;
		memberShipYear: string;
		reciteNumber: string;
		reciteDate: string;
		note: string;
	};
	serviceType: string;
	serviceDate: string;
	serviceTime: string;
	status: EventStatus;
	error: string;
}

export interface ClientDetailsProps {
	formState: ReservationData;
	handleDetailsChange: any;
}

export interface FormCustomInputProps {
	name: string;
	label?: string;
	type?: string;
	placeholder?: string;
	labelClasses?: string | null;
	inputClasses?: string | null;
	value: string;
	isTextArea?: boolean;
	id?: string;
	onChange: any;
}

export interface ServiceItemProps {
	title: string;
	subTitle: string;
	ServiceValue: string;
	selectedService: string;
	cardClickHandler: any;
}

export interface HomePageProps {
	eventsList: ReservationData[] | [];
}

export interface ServiceItemsListProps {
	formState: ReservationData;
	setFormState: Dispatch<SetStateAction<ReservationData>>;
}

export interface ServiceTimeProps {
	formState: ReservationData;
	setFormState: Dispatch<SetStateAction<ReservationData>>;
}

export enum ServiceTypes {
	CEIL = "حجز الرووف",
	CONFERENCE = "حجز قاعة المؤتمرات",
	BIRTHDAY = "حجز عيد ميلاد",
	MARRIAGE = "حجز عقد قرآن",
}

export enum EventStatus {
	WAITE = 0,
	CONFIRMED = 1,
	PROCESSING = 2,
	FULFILLED = 3,
	CANCELED = 4,
}
