import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

function createMainWindow() {
    const window = new BrowserWindow({
        width: 850,
        height: 610,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (isDevelopment) {
        window.webContents.openDevTools()
    }

    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    }
    else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }));
    }

    window.on('closed', () => {
        mainWindow = null;
    })

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus()
        });
    });

    return window;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

