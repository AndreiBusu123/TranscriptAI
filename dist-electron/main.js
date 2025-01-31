import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === "production"
    }
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  }
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
