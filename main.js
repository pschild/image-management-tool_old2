const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const PORT = 1234;

let mainWindow;

function run() {
    require('./server/server')(PORT);

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
        webPreferences: {
            webSecurity: false // for showing local images
        }
    });
    mainWindow.loadURL(`http://localhost:${PORT}/`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    mainWindow.focus();
}

app.on('ready', run);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        run();
    }
});