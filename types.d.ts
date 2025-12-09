type Statics = {
	totalStorage: number;
	totalMem: number;
	cpuModel: string;
};

type Dynamics = {
	cpuUsage: number;
	ramUsage: number;
	storageUsage: number;
};
interface Window {
	electron: {
		subscribeStatictics: (
			callback: (statics: Dynamics) => void
		) => UnsubscribeFunction;
		getStaticData: () => Promise<Statics>;
		subscribeChangeView: (
			callback: (view: View) => void
		) => UnsubscribeFunction;
		sendFrameAction: (payload: FrameWindowAction) => void;
	};
}
type View = "CPU" | "RAM" | "Storage" | "default";

type FrameWindowAction = "close" | "minimize" | "maximize";

type EventPayloadMapping = {
	DynamicsEve: Dynamics;
	StaticsEve: Statics;
	ChangeView: View;
	FrameAction: FrameWindowAction;
};

type UnsubscribeFunction = () => void;
