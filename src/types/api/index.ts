export * from "./response";

export interface ApiClient {
  setHeaders(headers: { [key: string]: string }): void;

  get(path: string, params?: any): Promise<any>;

  post(path: string, body: any, params?: any): Promise<any>;

  edit(path: string, body: any, params?: any): Promise<any>;

  remove(path: string, params?: any): Promise<any>;
}
