import { useContext } from "react";
import { GrafContext } from "../contexts/GrafContext";

import FetchData from "./FetchData";
import SelectData from "./SelectData";

const Main = () => {
	const { selectedPref } = useContext(GrafContext);

	return (
		<>
			<h1>選択された都道府県: {selectedPref.prefName}</h1>
			<SelectData />
			<FetchData />
		</>
	);
};

export default Main;
