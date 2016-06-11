'use strict';

// Handle Squirrel events for Windows immediately on start
if(require('electron-squirrel-startup')) return;

// app/main.js
const electron = require('electron');
const {app, BrowserWindow, autoUpdater, ipcMain} = electron;
const os = require('os');

let mainWindow = null;
let ses = null;
let isDev = process.env.NODE_ENV === 'development';

// quit when all windows close, except on mac, as that's the standard behaviour
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// create main window
app.on('ready', () => {
	setupPowerSave();
	createWindow();
});
// osx re-create window if all windows were closed
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 500,
		center: true,
		fullscreenable: false,
		autoHideMenuBar: true,
		//frame: false
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	ses = mainWindow.webContents.session;

	mainWindow.on('closed', () => {
		mainWindow = null;
		ses = null;
	});

	mainWindow.on('did-frame-finish-load', () => {
		// do nothing
	});
}

function setupPowerSave(app) {
	let powerMonitor = require('electron').powerMonitor;

	powerMonitor.on('suspend', () => {
		console.info(`System is going to sleep`);
	});

	powerMonitor.on('resume', () => {
		console.info(`System has resumed from sleep`);
	});

	powerMonitor.on('on-ac', () => {
		console.info(`System is on AC power`);
	});

	powerMonitor.on('on-battery', () => {
		console.info(`System is on battery power`);
	});


}