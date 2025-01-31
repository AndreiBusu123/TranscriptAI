import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === 'production'
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Load the index.html from a url
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    // In production, use the directory where the script is located
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
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