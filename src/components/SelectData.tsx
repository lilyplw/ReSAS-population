import { useContext } from "react";
import { GrafContext } from "../contexts/GrafContext";
import { Prefectures, PrefectureType } from "../data/prefectures";

const SelectData = () => {
	const { selectedPref, setSelectedPref } = useContext(GrafContext);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newPrefCode = Number(e.target.value);
		const newPrefecture = Prefectures.find(
			(pref) => pref.prefCode === newPrefCode
		);
		if (newPrefecture) {
			setSelectedPref(newPrefecture);
		}
	};

	return (
		<select value={selectedPref.prefCode} onChange={handleChange}>
			{Prefectures.map((prefecture: PrefectureType) => (
				<option key={prefecture.prefCode} value={prefecture.prefCode}>
					{prefecture.prefName}
				</option>
			))}
		</select>
	);
};

export default SelectData;
