import { app, BrowserWindow } from "electron";
import { ipcMainHandle, ipcMainOn, isDev } from "./util.js";
import { getDynamicData, getStaticdata } from "./resourcemanager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

// Menu.setApplicationMenu(null);

app.on("ready", () => {
	const main = new BrowserWindow({
		icon: path.join(getAssetPath(), "appicon.png"),
		webPreferences: {
			preload: getPreloadPath(),
		},
		frame: false,
	});

	if (isDev()) {
		main.loadURL("http://localhost:5173");
	} else {
		main.loadFile(getUIPath());
	}
	getDynamicData(main);
	ipcMainHandle("StaticsEve", () => getStaticdata());
	ipcMainOn("FrameAction", (payload) => {
		switch (payload) {
			case "close":
				main.close();
				break;
			case "maximize":
				if (main.isMaximized()) {
					main.unmaximize();
				} else {
					main.maximize();
				}
				break;
			case "minimize":
				main.minimize();
				break;
			default:
				break;
		}
	});

	createTray(main);
	createMenu(main);
	handleCloseEvent(main);
});

function handleCloseEvent(main: BrowserWindow) {
	let shouldClose = false;
	main.on("close", (e) => {
		if (shouldClose) return;
		e.preventDefault();
		main.hide();
		if (app.dock) {
			app.dock.hide();
		}
	});
	app.on("before-quit", () => {
		shouldClose = true;
	});
	main.on("show", () => {
		shouldClose = false;
	});
}
