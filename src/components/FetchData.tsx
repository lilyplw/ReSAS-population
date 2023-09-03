// RESAS APIからデータを取得し、Grafコンポーネントに渡す

import { useContext } from "react";
import { GrafContext } from "../contexts/GrafContext";
import { usePopulationData } from "../hooks/useResasApi";
import Graf from "./Graf";

const FetchData = () => {
	const { selectedPref } = useContext(GrafContext);
	const prefCode = selectedPref.prefCode;
	const { data, isLoading, isError } = usePopulationData(prefCode);

	if (isError) return <div>Error: {isError.info?.message}</div>;
	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			{/* dataがundefinedでないことを確認 */}
			{data?.result && <Graf data={data.result.data[0].data} />}
		</>
	);
};

export default FetchData;
