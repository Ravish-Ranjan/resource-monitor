// import { useState } from "react";
import { useEffect, useMemo, useState } from "react";
import { useDynamics } from "./hooks/useDynamics";
import Chart from "./Chart";
import { Minimize } from "../assets/minimize";
import { Maximize } from "../assets/maximize";
import { Close } from "../assets/close";

function App() {
	const dynamics = useDynamics(10);
	const [activeView, setActiveView] = useState<View | "default">("default");

	const cpuUsage = useMemo(
		() => dynamics.map((val) => val.cpuUsage),
		[dynamics]
	);
	const ramUsage = useMemo(
		() => dynamics.map((val) => val.ramUsage),
		[dynamics]
	);
	const storageUsage = useMemo(
		() => dynamics.map((val) => val.storageUsage),
		[dynamics]
	);

	const activeUsages = useMemo(() => {
		switch (activeView) {
			case "CPU":
				return cpuUsage;
			case "RAM":
				return ramUsage;
			case "Storage":
				return storageUsage;
			default:
				return;
		}
	}, [activeView, cpuUsage, ramUsage, storageUsage]);

	useEffect(() => {
		return window.electron.subscribeChangeView((view) =>
			setActiveView(view)
		);
	}, []);

	return (
		<div className="bg-stone-600 h-full">
			<header className="absolute top-0 left-0 w-full justify-end items-center  bg-stone-800 flex text-white ">
				<button
					className="btn"
					onClick={() => window.electron.sendFrameAction("minimize")}
				>
					<Minimize className="w-full h-full" />
				</button>
				<button
					className="btn"
					onClick={() => window.electron.sendFrameAction("maximize")}
				>
					<Maximize className="w-full h-full" />
				</button>
				<button
					className="btn"
					onClick={() => window.electron.sendFrameAction("close")}
				>
					<Close className="w-full h-full" />
				</button>
			</header>
			{activeView === "default" ? (
				<div className="h-full flex gap-2 p-2">
					<Chart
						title="CPU"
						data={cpuUsage}
						maxDataPoints={10}
						hue={150}
					/>
					<Chart
						title="RAM"
						data={ramUsage}
						maxDataPoints={10}
						hue={270}
					/>
					<Chart
						title="Storage"
						data={storageUsage}
						maxDataPoints={10}
						hue={200}
					/>
				</div>
			) : (
				activeUsages && (
					<div className="h-full flex gap-2 p-2">
						<Chart
							title={activeView}
							data={activeUsages}
							maxDataPoints={10}
							hue={200}
							classname="flex-grow"
						/>
					</div>
				)
			)}
		</div>
	);
}

export default App;
