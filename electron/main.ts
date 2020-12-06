import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { treeStructure } from './treeStructure';
const {
  Worker, isMainThread
} = require('worker_threads');

const createWindow = () => {
  const mainWindow: Electron.BrowserWindow = new BrowserWindow({
    icon: path.join(__dirname, '../dist/electron-app/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  mainWindow.loadURL('http://localhost:4200');
  mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
};

app.on('ready', createWindow);

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

ipcMain.handle('readFolder', async (event, paths) => {
  const worker = new Worker('./treeStructure.js', { workerData: { paths } });
  return await new Promise(
    (resolve, reject) => worker.once('message', resolve).once('error', reject)
  );
/*  const data = await treeStructure(paths);
  return JSON.stringify(data);*/
/*  // @ts-ignore
  await fsPromises.writeFile('../src/assets/my.json', JSON.stringify(data, false, 4));
  console.log('done', (Date.now() - start) / 1000);*/
});
