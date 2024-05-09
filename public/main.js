const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const os = require('os');
const { exec } = require('child_process');
const { resolve } = require('path');
const { rejects } = require('assert');

const isProd = process.env.NODE_ENV !== 'development';

// 获取磁盘信息
function getDiskInfo() {
    return new Promise((resolve, reject) => {
        const platform = os.platform();
        if (platform === 'win32') {
            // Windows 平台
            exec('wmic logicaldisk get name,size,freespace', (err, stdout, stderr) => {
                if (err) reject(err);
                resolve(stdout);
            });
        }
        else {
            os.diskusage('/', (err, info) => {
                if (err) reject(err);
                resolve(info);
            });
        }
    })
}

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

    ipcMain.handle('do-something', async () => {
        return await getDiskInfo();
    });

    isProd ? win.loadFile(`${__dirname}/index.html`) : win.loadURL('http://localhost:8001')
}

// Menu.setApplicationMenu(Menu.buildFromTemplate([]))
app.whenReady().then(() => {
    createWindow()
})
