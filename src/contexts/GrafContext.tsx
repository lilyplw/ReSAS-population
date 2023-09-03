import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { PrefectureType } from "../data/prefectures";

interface GrafContextType {
	selectedPref: PrefectureType;
	setSelectedPref: Dispatch<SetStateAction<PrefectureType>> | null;
}

export const GrafContext = createContext<GrafContextType>({
	selectedPref: { prefCode: 13, prefName: "東京都" },
	setSelectedPref: null,
});

interface AppProviderProps {
	children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
	const [selectedPref, setSelectedPref] = useState<PrefectureType>({
		prefCode: 13,
		prefName: "東京都",
	});

	return (
		<GrafContext.Provider value={{ selectedPref, setSelectedPref }}>
			{children}
		</GrafContext.Provider>
	);
}
