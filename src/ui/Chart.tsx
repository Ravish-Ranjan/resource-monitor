import { useMemo } from "react";
import BaseChart from "./BaseChart";

export type ChartProps = {
	data: number[];
	maxDataPoints: number;
	hue: number;
	title: string;
	classname?: string;
};

function Chart(props: ChartProps) {
	const prepareData = useMemo(() => {
		const points = props.data.map((val) => ({ value: val * 100 }));
		return [
			...points,
			...Array.from({ length: props.maxDataPoints - points.length }).map(
				() => ({ value: undefined })
			),
		];
	}, [props.data, props.maxDataPoints]);
	return (
		<div
			className={`mt-8 h-60 w-1/3 flex flex-col p-2 bg-stone-800 rounded-2xl ${props.classname}`}
		>
			<div className="flex justify-between items-center text-white">
				<h2 className="text-xl font-semibold">{props.title}</h2>
				<span className="text-sm">
					{Math.round(props.data[props.data.length - 1] * 10000) /
						100}
					%
				</span>
			</div>
			<BaseChart data={prepareData} hue={props.hue} />
		</div>
	);
}

export default Chart;
