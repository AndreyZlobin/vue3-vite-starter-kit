import { ApiClient } from "~/types";

export class BaseApi implements ApiClient {
  constructor(protected readonly _baseUrl: string) {}

  _successResponseHandler(response: any) {
    throw new Error("Abstract method, cannot be implemented");
  }

  _errorResponseHandler(error: any) {
    throw new Error("Abstract method, cannot be implemented");
  }

  setHeaders(headers: { [key: string]: string }): void {
    throw new Error("Abstract method, cannot be implemented");
  }

  async post(path: string, body = {}, params = {}): Promise<any> {
    throw new Error("Abstract method, cannot be implemented");
  }

  async get(path: string, params = {}): Promise<any> {
    throw new Error("Abstract method, cannot be implemented");
  }

  async edit(path: string, body = {}, params = {}): Promise<any> {
    throw new Error("Abstract method, cannot be implemented");
  }

  async remove(path: string, params = {}): Promise<any> {
    throw new Error("Abstract method, cannot be implemented");
  }
}
