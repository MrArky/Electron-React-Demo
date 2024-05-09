const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');

const isProd = process.env.NODE_ENV !== 'development';

const createWindow = () => {
    const win = new BrowserWindow({
        title: 'Hello Umi',
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false,
            preload: __dirname + '/preload.js'
        },
    })

    // ipcMain.on('do-something', () => {
    //     console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
    // });
    ipcMain.handle('do-something', () => {
        console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));
        return 6666;
    });

    isProd ? win.loadFile(`${__dirname}/index.html`) : win.loadURL('http://localhost:8001')
}

// Menu.setApplicationMenu(Menu.buildFromTemplate([]))
app.whenReady().then(() => {
    createWindow()
})
