import { remote, contextBridge, ipcRenderer } from 'electron';

/*window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});*/

contextBridge.exposeInMainWorld(
  'api', {
    openDialog: () => remote.dialog.showOpenDialog({ title: 'Select a folder', properties: ['openDirectory']}),
    sendToMain: (field: string, path: any) => ipcRenderer.invoke(field, path)
  }
);

