import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
import { ClientDetailsProps } from "../types";

function ClientDetails({ formState, setFormState }: ClientDetailsProps) {
	const FormCustomInput = dynamic(() => import("./FormCustomInput"), {
		ssr: false,
	});
	return (
		<div className="my-4">
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold text-[#1499B4]">تفاصيل الحجز</h2>
				<div className="md:grid grid-cols-2 grid-rows-none gap-4 shadow-xl bg-white p-8 rounded-lg">
					<div className="col-start-1 col-end-2 flex flex-col flex-shrink gap-4 pb-4">
						<FormCustomInput
							name={"name"}
							label={"الاسم"}
							placeholder={"شريف"}
							value={formState?.clientDetails?.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: { ...prev.clientDetails, name: e.target.value },
									};
								})
							}
						/>
						<div className="grid grid-cols-[auto_minmax(100px,_1fr)] px-4 py-2  gap-2 bg-[#F5F6F7] shadow-lg rounded-lg">
							<label className="block text-sm font-medium text-[#A3ACB5]">رقم العضوية</label>
							<div className="grid grid-cols-2">
								<input
									className="text-black bg-transparent outline-none"
									type="number"
									name="code"
									placeholder="22"
									value={formState?.clientDetails?.memberShipCode}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setFormState((prev) => {
											return {
												...prev,
												error: "",
												clientDetails: {
													...prev.clientDetails,
													memberShipCode: e.target.value,
												},
											};
										})
									}
								/>
								<input
									className="text-black bg-transparent outline-none"
									type="number"
									name="code"
									placeholder="1976"
									value={formState?.clientDetails?.memberShipYear}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setFormState((prev) => {
											return {
												...prev,
												error: "",
												clientDetails: {
													...prev.clientDetails,
													memberShipYear: e.target.value,
												},
											};
										})
									}
								/>
							</div>
						</div>
						<FormCustomInput
							name={"phone"}
							label={"التليفون"}
							placeholder={"01xxxxxxxxxx"}
							type={"tel"}
							value={formState?.clientDetails?.phone}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: { ...prev.clientDetails, phone: e.target.value },
									};
								})
							}
						/>
						<FormCustomInput
							name={"email"}
							label={"الايميل"}
							placeholder={"example@email.com"}
							type={"email"}
							value={formState?.clientDetails?.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: { ...prev.clientDetails, email: e.target.value },
									};
								})
							}
						/>
						<FormCustomInput
							name={"reciteNumber"}
							label={"رقم الايصال"}
							type={"number"}
							placeholder={"2700"}
							value={formState?.clientDetails?.reciteNumber}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: {
											...prev.clientDetails,
											reciteNumber: e.target.value,
										},
									};
								})
							}
						/>
						<FormCustomInput
							name={"reciteDate"}
							label={"تاريخ الايصال"}
							placeholder={"01xxxxxxxxxx"}
							type={"date"}
							value={formState?.clientDetails?.reciteDate}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: { ...prev.clientDetails, reciteDate: e.target.value },
									};
								})
							}
						/>
					</div>

					<div className="col-start-2 col-end-3 row-start-1 row-end-2">
						<FormCustomInput
							isTextArea
							name={"note"}
							value={String(formState?.clientDetails?.note)}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((prev) => {
									return {
										...prev,
										error: "",
										clientDetails: { ...prev.clientDetails, note: e.target.value },
									};
								})
							}
							placeholder={"ملاحظات (اختياري)"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClientDetails;
