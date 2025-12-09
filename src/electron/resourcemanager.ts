import osUtils from "os-utils";
const pullInterval = 1000;
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";
import { ipcwebContentsSend } from "./util.js";

export function getDynamicData(mainWindow: BrowserWindow) {
	setInterval(async () => {
		const cpuUsage = await getCPUUsage();
		const ramUsage = getRAMUsage();
		const storageUsage = getStorageUsage().usage;

		ipcwebContentsSend("DynamicsEve", mainWindow.webContents, {
			cpuUsage,
			ramUsage,
			storageUsage,
		});
	}, pullInterval);
}

export function getStaticdata() {
	const totalStorage = getStorageUsage().total;
	const cpuModel = os.cpus()[0].model;
	const totalMem = Math.round(osUtils.totalmem() / 1024);
	return {
		totalStorage,
		cpuModel,
		totalMem,
	};
}

function getCPUUsage(): Promise<number> {
	return new Promise((resolve) => {
		osUtils.cpuUsage(resolve);
	});
}

function getRAMUsage() {
	return 1 - osUtils.freememPercentage();
}

function getStorageUsage() {
	const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
	const total = stats.bsize * stats.blocks;
	const free = stats.bsize * stats.bfree;

	return {
		total: Math.round(total / 1_000_000_000),
		usage: 1 - free / total,
	};
}
