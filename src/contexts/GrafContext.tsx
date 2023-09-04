import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { usePopulationData } from "../hooks/useResasApi";
import { PrefectureType } from "../data/prefectures";

// このAPIのデータの型は何かに依存します。適切な型に変更してください。
interface ApiDataType {
  [key: string]: any;
}

interface GrafContextType {
  selectedPref: PrefectureType;
  setSelectedPref: Dispatch<SetStateAction<PrefectureType>> | null;
  apiData: ApiDataType;
  setApiData: Dispatch<SetStateAction<ApiDataType>> | null;
}

export const GrafContext = createContext<GrafContextType>({
  selectedPref: { prefCode: 13, prefName: "東京都" },
  setSelectedPref: null,
  apiData: {},
  setApiData: null,
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [selectedPref, setSelectedPref] = useState<PrefectureType>({
    prefCode: 13,
    prefName: "東京都",
  });
  const [apiData, setApiData] = useState<ApiDataType>({});
  const { data, isLoading, isError } = usePopulationData(selectedPref.prefCode);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      // データが読み込まれていてエラーもなければ apiData を更新
      setApiData(data.result.data[0].data);
    }
  }, [data, isLoading, isError]);

  return (
    <GrafContext.Provider
      value={{ selectedPref, setSelectedPref, apiData, setApiData }}
    >
      {children}
    </GrafContext.Provider>
  );
}
