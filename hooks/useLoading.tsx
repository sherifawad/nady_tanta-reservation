import { Suspense, useCallback, useMemo, useState } from "react";
import AddModel from "../components/common/AddModel";
import Spinner from "../components/Spinner";
import { ModelProps } from "../types";

function useLoading() {
	const [loading, setLoading] = useState<Boolean>(false);

	const LoadingModel = useMemo(() => {
		return function LoadingModel() {
			return loading && <Spinner />;
		};
	}, [loading]);

	return {
		setLoading,
		LoadingModel,
	};
}

export default useLoading;
