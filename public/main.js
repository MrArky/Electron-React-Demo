const { app, BrowserWindow, Menu, ipcMain, dialog, Tray } = require('electron');
const os = require('os');
const { exec } = require('child_process');

const isProd = process.env.NODE_ENV !== 'development';

/**
 * 获取磁盘信息
 * @returns 
 */
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
    win.on('close', (e) => {
        e.preventDefault(); // 阻止默认的窗口关闭行为
        win.hide(); // 隐藏窗口，而不是销毁
    });
    isProd ? win.loadFile(`${__dirname}/index.html`) : win.loadURL('http://localhost:8001');
}

// Menu.setApplicationMenu(Menu.buildFromTemplate([]))
app.whenReady().then(() => {
    const tray = new Tray(__dirname + '/favicon.ico');
    //设置此托盘图标的悬停提示内容
    tray.setToolTip('Hello Umi.');
    //系统托盘右键菜单
    const trayMenuTemplate = [
        {
            label: '设置',
            click: function () { } //打开相应页面
        },
        {
            label: '帮助',
            click: function () { }
        },
        {
            label: '关于',
            click: function () { }
        },
        {
            label: '退出',
            click: function () {
                //ipc.send('close-main-window');
                app.quit();
            }
        }
    ];
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //设置此图标的上下文菜单
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        } else {
            BrowserWindow.getAllWindows()[0].show();
        }
    });
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})