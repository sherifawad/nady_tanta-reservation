import { useId } from "react";
import { FormCustomInputProps } from "../types";

function FormCustomInput({
	name,
	label,
	type = "text",
	placeholder = "",
	labelClasses = null,
	inputClasses = null,
	value,
	isTextArea = false,
	onChange,
	id,
}: FormCustomInputProps) {
	const generatedId = useId();
	id = id ? id : generatedId;
	return (
		<div className="grid grid-cols-[80px_auto] px-4 py-2  bg-[#F5F6F7] shadow-lg rounded-lg">
			{label ? (
				<label
					className={`${labelClasses ? labelClasses : "block text-sm font-medium text-[#A3ACB5]"}`}
					htmlFor={id}
				>
					{label}
				</label>
			) : (
				""
			)}
			{isTextArea ? (
				<textarea
					rows={4}
					cols={5}
					id={id}
					name={name}
					placeholder={placeholder}
					value={value || ""}
					onChange={onChange}
					className="text-black text-sm bg-transparent outline-none flex-1 col-span-2"
				/>
			) : (
				<input
					className={`${
						inputClasses ? inputClasses : "text-black text-sm bg-transparent outline-none w-full"
					}`}
					type={type}
					id={id}
					name={name}
					placeholder={placeholder}
					value={value || ""}
					onChange={onChange}
				/>
			)}
		</div>
	);
}

export default FormCustomInput;
