import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

interface BaseChartProps {
	data: { value: number | undefined }[];
	hue: number;
}

function BaseChart(props: BaseChartProps) {
	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<AreaChart data={props.data}>
				<CartesianGrid
					stroke="#333"
					strokeDasharray="5 5"
					fill="#1c1c1c"
				/>
				<Area
					fillOpacity={0.3}
					fill={`hsl(${props.hue},50%,50%)`}
					stroke={`hsl(${props.hue},50%,50%)`}
					strokeWidth={3}
					type="monotone"
					dataKey="value"
					isAnimationActive={false}
				/>
				<XAxis stroke="transparent" height={0} />
				<YAxis domain={[0, 100]} stroke="transparent" width={0} />
			</AreaChart>
		</ResponsiveContainer>
	);
}
export default BaseChart;
