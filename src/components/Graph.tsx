import { useRef, useContext } from "react";
import { GraphContext } from "../contexts/GraphContext";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface DataPoint {
  year: number;
  value: number;
}

interface GraphProps extends HighchartsReact.Props {
  data: { [key: string]: DataPoint }; // DataPointオブジェクトのキーでアクセスできるようにします。
}

const Graph = (props: GraphProps) => {
  const { selectedPref } = useContext(GraphContext);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { data, ...restProps } = props;

  if (Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  // オブジェクトからyearとvalueの配列を生成する
  const years: number[] = [];
  const values: number[] = [];

  Object.keys(data).forEach((key) => {
    const point = data[key];
    years.push(point.year);
    values.push(point.value);
  });

  const options: Highcharts.Options = {
    xAxis: {
      categories: years.map(String), // 数値を文字列に変換
    },
    title: {
      text: `${selectedPref.prefName}の人口推移`,
    },
    series: [
      {
        type: "line",
        name: selectedPref.prefName,
        data: values,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...restProps}
    />
  );
};

export default Graph;
