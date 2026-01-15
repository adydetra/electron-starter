const path = require('path');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const isDev = !app.isPackaged;
let mainWindow;

// === WINDOW ===
function createWindow() {
  const iconPath = isDev ? path.join(__dirname, '..', 'build', 'icon.ico') : path.join(process.resourcesPath, 'build', 'icon.ico');

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    show: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#020617',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // Allow loading local files (file://)
    },
  });

  Menu.setApplicationMenu(null);

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173/');
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    if (isDev) {
      // mainWindow.webContents.openDevTools(); // Open DevTools only in dev mode
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// === IPC HANDLERS ===
ipcMain.handle('window-control', (_event, action) => {
  if (!mainWindow) return;
  switch (action) {
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      mainWindow.maximize();
      break;
    case 'unmaximize':
      mainWindow.unmaximize();
      break;
    case 'close':
      mainWindow.close();
      break;
    default:
      break;
  }
});

// Window state
ipcMain.handle('get-window-state', () => {
  if (!mainWindow) return { isMaximized: false };
  return { isMaximized: mainWindow.isMaximized() };
});


// === APP LIFECYCLE ===
app.whenReady().then(() => {
  // Force disable auto-start (cleanup legacy setting)
  app.setLoginItemSettings({
    openAtLogin: false,
    path: app.getPath('exe'),
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
