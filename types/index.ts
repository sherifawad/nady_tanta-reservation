import { Dispatch, SetStateAction } from "react";

export interface ReservationData {
	clientDetails: {
		id?: Number;
		email: string | null;
		name: string | null;
		phone: string | null;
		memberShipCode: string | null;
		memberShipYear: string | null;
		reciteNumber: string | null;
		reciteDate: string | null;
		note: string | null;
	};
	serviceType: ServiceTypes | null;
	serviceDate: string | null;
	serviceTime: string | null;
	status: EventStatus;
	error: string | null;
}

export interface dataBaseData {
	id?: Number;
	email: string | null;
	name: string | null;
	phone: string | null;
	note: string | null;
	service_type: string | null;
	service_date: string | null;
	service_time: string | null;
	event_status: Number;
	recite_number: string | null;
	recite_date: string | null;
	member_ship_code: string | null;
	member_ship_year: string | null;
	created_at?: string;
	created_by: string | null;
}

export interface EventPageProps {
	event?: dataBaseData;
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
	pattern?: string;
	labelClasses?: string | null;
	inputClasses?: string | null;
	value?: string;
	isTextArea?: boolean;
	required?: boolean;
	id?: string;
	onChange: any;
}

export interface ServiceItemProps {
	title: string;
	subTitle: string;
	ServiceValue: ServiceTypes | null;
	selectedService: string | null;
	cardClickHandler: any;
}

export interface HomePageProps {
	eventsList: dataBaseData[] | [];
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
	FULFILLED = 2,
	CANCELED = 3,
}
