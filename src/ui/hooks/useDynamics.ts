import { useEffect, useState } from "react";

export function useDynamics(dataPointCount: number) {
	const [value, setValue] = useState<Dynamics[]>([]);
	useEffect(() => {
		const unsub = window.electron.subscribeStatictics((statistics) =>
			setValue((prev) => {
				const newData = [...prev, statistics];
				if (newData.length > dataPointCount) newData.shift();
				return newData;
			})
		);
		return unsub;
	}, [dataPointCount]);
	return value;
}
