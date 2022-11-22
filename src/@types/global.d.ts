declare global {
  interface Window {
    myApp: MyAppInterface;
  }
}

export interface MyAppInterface {
  readDirectory: (path: string) => Promise<string[]>;
}
