import { app, BrowserWindow, Menu } from "electron";
import { ipcwebContentsSend, isDev } from "./util.js";

export function createMenu(main: BrowserWindow) {
	Menu.setApplicationMenu(
		Menu.buildFromTemplate([
			{
				label: process.platform == "darwin" ? undefined : "App",
				submenu: [
					{
						label: "DevTools",
						click: () => main.webContents.openDevTools(),
						visible: isDev(),
					},
					{ label: "Quit", click: () => app.quit() },
				],
			},
			{
				label: "View",
				type: "submenu",
				submenu: [
					{
						label: "Default",
						click: () =>
							ipcwebContentsSend(
								"ChangeView",
								main.webContents,
								"default"
							),
					},
					{
						label: "CPU",
						click: () =>
							ipcwebContentsSend(
								"ChangeView",
								main.webContents,
								"CPU"
							),
					},
					{
						label: "RAM",
						click: () =>
							ipcwebContentsSend(
								"ChangeView",
								main.webContents,
								"RAM"
							),
					},
					{
						label: "Storage",
						click: () =>
							ipcwebContentsSend(
								"ChangeView",
								main.webContents,
								"Storage"
							),
					},
				],
			},
		])
	);
}
