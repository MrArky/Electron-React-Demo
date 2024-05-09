export interface IElectronAPI {
  doSomething: () => Promise<number>,
}

declare global {
  interface Window {
    myAPI: IElectronAPI
  }
}