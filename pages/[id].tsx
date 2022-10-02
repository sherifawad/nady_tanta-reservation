/* eslint-disable @next/next/no-img-element */
import { withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";
import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import ClientDetails from "../components/ClientDetails";
import ServiceItemsList from "../components/ServiceItemsList";
import ServiceTime from "../components/ServiceTime";
import Spinner from "../components/Spinner";
import { EventPageProps, EventStatus, ReservationData, ServiceTypes } from "../types";
import { getURL } from "../utils/helpers";

const EventPage = ({ event }: EventPageProps) => {
	const router = useRouter();

	const [loading, setLoading] = useState<Boolean>(false);

	const [formState, setFormState] = useState<ReservationData>({
		clientDetails: {
			id: 0,
			email: null,
			name: null,
			phone: null,
			memberShipCode: null,
			memberShipYear: null,
			reciteNumber: null,
			reciteDate: null,
			note: null,
		},
		serviceType: null,
		serviceDate: null,
		serviceTime: null,
		status: 0,
		error: null,
	});

	useEffect(() => {
		if (!event) {
			return;
		}
		const {
			service_type,
			service_date,
			service_time,
			event_status,
			recite_number,
			recite_date,
			member_ship_code,
			member_ship_year,
			created_at,
			created_by,
			...rest
		} = event;

		setFormState({
			error: null,
			status: event_status as EventStatus,
			serviceType: service_type ? (service_type as ServiceTypes) : null,
			serviceDate: service_date,
			serviceTime: service_time,
			clientDetails: {
				memberShipCode: member_ship_code,
				memberShipYear: member_ship_year,
				reciteDate: recite_date,
				reciteNumber: recite_number,
				...rest,
			},
		});
	}, [event]);

	const onSubmit = async () => {
		if (formState?.error) return;

		if (
			!formState.serviceDate ||
			!formState.serviceTime ||
			!formState.serviceType ||
			!formState.clientDetails.name ||
			!formState.clientDetails.phone
		) {
			alert("املأ البيانات");
			return;
		}
		// alert(JSON.stringify(formState, null, 2));
		// return;

		setLoading(true);
		try {
			let res: AxiosResponse<any, any>;

			if (formState?.clientDetails?.id) {
				res = await axios({
					method: "PUT",
					url: `/api/events/${formState?.clientDetails?.id}`,
					data: {
						event_status: formState.status,
						service_type: formState.serviceType,
						service_date: formState.serviceDate,
						service_time: formState.serviceTime,
						member_ship_code: formState.clientDetails.memberShipCode,
						member_ship_year: formState.clientDetails.memberShipYear,
						recite_date: formState.clientDetails.reciteDate,
						recite_number: formState.clientDetails.reciteNumber,
						name: formState.clientDetails.name,
						email: formState.clientDetails.email,
						phone: formState.clientDetails.phone,
						note: formState.clientDetails.note,
					},
				});
			} else {
				res = await axios({
					method: "POST",
					url: `/api/events/`,
					data: {
						event_status: formState.status,
						service_type: formState.serviceType,
						service_date: formState.serviceDate,
						service_time: formState.serviceTime,
						member_ship_code: formState.clientDetails.memberShipCode,
						member_ship_year: formState.clientDetails.memberShipYear,
						recite_date: formState.clientDetails.reciteDate,
						recite_number: formState.clientDetails.reciteNumber,
						name: formState.clientDetails.name,
						email: formState.clientDetails.email,
						phone: formState.clientDetails.phone,
						note: formState.clientDetails.note,
					},
				});
			}
			if (res?.status === 200) {
				setLoading(false);
			}
			router.push("/");
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}

			// error is string
			alert(error);
		}

		setLoading(false);
	};

	const showSpinner = (loading: Boolean) => {
		return loading && <Spinner />;
	};

	const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.id === "status") {
			setFormState((prev) => {
				return {
					...prev,
					status: e.target.value as unknown as EventStatus,
				};
			});
		} else {
			setFormState((prev) => {
				return {
					...prev,
					clientDetails: { ...prev.clientDetails, [e.target.id]: e.target.value },
				};
			});
		}
	};

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				{showSpinner(loading)}
				<img src="/headerImage.png" alt="mainImage" className="w-full" />
				<div className="md:px-16 px-4 py-8">
					<ServiceItemsList formState={formState} setFormState={setFormState} />
					<ServiceTime formState={formState} setFormState={setFormState} />
					<ClientDetails formState={formState} handleDetailsChange={handleDetailsChange} />
					<div className="w-full flex justify-center my-16">
						<button
							className="shadow-xl rounded-xl bg-yellow-500 w-64 p-2"
							onClick={() => onSubmit()}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
	// authRequired: false,
	redirectTo: "/auth",
	async getServerSideProps({ req, params }) {
		try {
			if (!params || !params.id || params.id === "0") {
				return {
					props: {},
				};
			}
			const { id } = params;

			const {
				data: { data },
			} = await axios({
				method: "GET",
				url: `${getURL()}/api/events/${id}`,
				headers: req ? { cookie: req.headers.cookie ? req.headers.cookie : "" } : undefined,
			});

			return {
				props: { event: data },
			};
		} catch (error) {
			// check if the error was thrown from axios
			if (axios.isAxiosError(error)) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					// console.log(
					// 	"🚀 ~ file: [id].tsx ~ line 90 ~ constgetStaticProps:GetStaticProps= ~ error.response",
					// 	error.response.data
					// );
					// console.log(
					// 	"🚀 ~ file: ind[id]ex.tsx ~ line 94 ~ constgetStaticProps:GetStaticProps= ~ error.response",
					// 	error.response.status
					// );
					// console.log(
					// 	"🚀 ~ file: [id].tsx ~ line 98 ~ constgetStaticProps:GetStaticProps= ~ error.response",
					// 	error.response.headers
					// );
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the
					// browser and an instance of
					// http.ClientRequest in node.js
					// console.log(
					// 	"🚀 ~ file: [id].tsx ~ line 107 ~ constgetStaticProps:GetStaticProps= ~ error.request",
					// 	error.request
					// );
				}
				throw error;
			}
			// check if instance of error not throw string but => throw new Error("")
			if (error instanceof Error) {
				throw error;
			}

			// error is string
			throw new Error(error as string);
		}
	},
});

export default EventPage;
