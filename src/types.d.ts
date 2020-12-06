interface IApi {
  openDialog(): Promise<{ filePaths: string[] }>;
  sendToMain(field: string, path: any): void;
}

declare const api: IApi;


