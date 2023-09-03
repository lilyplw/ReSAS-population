import { useRef, useContext } from "react";
import { GrafContext } from "../contexts/GrafContext";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface DataPoint {
	year: number;
	value: number;
}

interface GrafProps extends HighchartsReact.Props {
	data: DataPoint[];
}

const Graf = (props: GrafProps) => {
	const { selectedPref } = useContext(GrafContext);
	const { data, ...restProps } = props;

	// yearとvalueを別々の配列に分ける
	const years = data.map((point) => point.year);
	const values = data.map((point) => point.value);

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

	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			ref={chartComponentRef}
			{...restProps}
		/>
	);
};

export default Graf;
