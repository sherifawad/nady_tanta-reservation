import { ClientDetailsProps } from "../types";
import FormCustomInput from "./FormCustomInput";

function ClientDetails({ formState, handleDetailsChange }: ClientDetailsProps) {
	// const FormCustomInput = dynamic(() => import("./FormCustomInput"), {
	// 	ssr: false,
	// });
	return (
		<div className="my-4">
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold text-[#1499B4]">تفاصيل الحجز</h2>
				<div className="md:grid grid-cols-2 grid-rows-none gap-4 shadow-xl bg-white p-8 rounded-lg">
					<div className="col-start-1 col-end-2 flex flex-col flex-shrink gap-4 pb-4">
						<FormCustomInput
							name={"name"}
							label={"الاسم"}
							id={"name"}
							placeholder={"شريف"}
							value={formState?.clientDetails?.name}
							onChange={handleDetailsChange}
						/>

						<div className="grid grid-cols-[auto_minmax(100px,_1fr)] px-4 py-2  gap-2 bg-[#F5F6F7] shadow-lg rounded-lg">
							<label className="block text-sm font-medium text-[#A3ACB5]">رقم العضوية</label>
							<div className="grid grid-cols-2">
								<input
									className="text-black bg-transparent outline-none"
									type="number"
									name="memberShipCode"
									id="memberShipCode"
									placeholder="22"
									value={formState?.clientDetails?.memberShipCode}
									onChange={handleDetailsChange}
								/>
								<input
									className="text-black bg-transparent outline-none"
									type="number"
									name="memberShipYear"
									id="memberShipYear"
									placeholder="1976"
									value={formState?.clientDetails?.memberShipYear}
									onChange={handleDetailsChange}
								/>
							</div>
						</div>

						<FormCustomInput
							name={"phone"}
							label={"التليفون"}
							id={"phone"}
							type={"tel"}
							placeholder={"01xxxxxxxxxx"}
							value={formState?.clientDetails?.phone}
							onChange={handleDetailsChange}
						/>

						{/* 
						<div className="grid grid-cols-[80px_1fr] px-4 py-2  bg-[#F5F6F7] shadow-lg rounded-lg">
							<label className="block text-sm font-medium text-[#A3ACB5]" htmlFor="email">
								الايميل
							</label>

							<input
								className="text-black text-sm bg-transparent outline-none w-full"
								type="email"
								id="email"
								name="email"
								placeholder="example@email.com"
								value={formState?.clientDetails?.email}
								onChange={handleDetailsChange}
							/>
						</div> */}

						<FormCustomInput
							name={"reciteNumber"}
							label={"رقم الايصال"}
							id={"reciteNumber"}
							type={"number"}
							placeholder={"0011"}
							value={formState?.clientDetails?.reciteNumber}
							onChange={handleDetailsChange}
						/>

						<FormCustomInput
							name={"reciteDate"}
							label={"تاريخ الايصال"}
							id={"reciteDate"}
							type={"date"}
							placeholder={"01/01/2001"}
							value={formState?.clientDetails?.reciteDate}
							onChange={handleDetailsChange}
						/>
					</div>

					<div className="col-start-2 col-end-3 row-start-1 row-end-2">
						<FormCustomInput
							name={"note"}
							id={"note"}
							isTextArea
							placeholder={"ملاحظات (اختياري)"}
							value={String(formState?.clientDetails?.note)}
							onChange={handleDetailsChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClientDetails;
