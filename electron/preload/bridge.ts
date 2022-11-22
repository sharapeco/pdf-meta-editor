import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('myApp', {
  async readDirectory(path: string): Promise<string[]> {
    return await ipcRenderer.invoke('readDirectory', path)
  }
})
