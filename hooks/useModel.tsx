import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import AddModel from "../components/common/AddModel";
import { ModelProps } from "../types";

function useModel() {
	const [isOpened, setIsOpened] = useState(false);
	const [isClosed, setIsClosed] = useState(true);

	const onClose = useCallback(() => {
		setIsOpened(false);
		setIsClosed(true);
	}, []);

	const Model = useMemo(() => {
		return function Model({ children, title }: ModelProps) {
			return (
				<Suspense>
					<AddModel isOpened={isOpened} onClose={onClose} title={title}>
						{children}
					</AddModel>
				</Suspense>
			);
		};
	}, [isOpened, onClose]);

	const modelProps = useMemo(() => {
		return {
			onClose,
		};
	}, [onClose]);

	return {
		setIsOpened,
		isClosed,
		Model,
		modelProps,
	};
}

export default useModel;
