import { ipcMain } from "electron";
import type { WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() {
	return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
	key: Key,
	handler: () => EventPayloadMapping[Key]
) {
	ipcMain.handle(key, (e) => {
		if (e.senderFrame) {
			validateEventFrame(e.senderFrame);
		} else {
			throw new Error("Mallacious Event");
		}
		return handler();
	});
}

export function ipcwebContentsSend<Key extends keyof EventPayloadMapping>(
	key: Key,
	webContents: WebContents,
	payload: EventPayloadMapping[Key]
) {
	webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
	if (isDev() && new URL(frame.url).host === "localhost:5173") {
		return;
	}
	if (frame && frame.url !== pathToFileURL(getUIPath()).toString()) {
		throw new Error("Mallacious Event");
	}
}

export function ipcMainOn<Key extends keyof EventPayloadMapping>(
	key: Key,
	handler: (payload: EventPayloadMapping[Key]) => void
) {
	ipcMain.on(key, (e, payload) => {
		if (e.senderFrame) {
			validateEventFrame(e.senderFrame);
		} else {
			throw new Error("Mallacious Event");
		}
		return handler(payload);
	});
}
