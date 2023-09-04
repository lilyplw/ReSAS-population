// RESAS APIからデータを取得し、Graphコンポーネントに渡す

import { useContext } from "react";
import { GraphContext } from "../contexts/GraphContext";
import { usePopulationData } from "../hooks/useResasApi";
import Graph from "./Graph";

const FetchData = () => {
  const { selectedPref, apiData } = useContext(GraphContext);
  const { data, isLoading, isError } = usePopulationData(selectedPref.prefCode);

  if (isError) return <div>Error: {isError.info?.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* dataがundefinedでないことを確認 */}
      {data?.result && <Graph data={apiData} />}
    </>
  );
};

export default FetchData;
