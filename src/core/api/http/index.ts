import { AxiosProvider } from "./providers/axios.provider";
import { BaseApi } from "./base-api";
import { ApiClient, ErrorResponse, SuccessType } from "~/types";
import { BASE_API_URL } from "~/shared/constants";

/**
 * @example
 * const $http = new HttpClient('BASE_API_PATH')
 * const getResponse = async (path) => await $http.get(path)
 * */
class HttpClient extends BaseApi implements ApiClient {
  constructor(baseUrl: string, private provider: ApiClient) {
    super(baseUrl);
  }

  setHeaders(headers: { [key: string]: string }) {
    return this.provider.setHeaders(headers);
  }

  /**
   * @param {string} path
   * @param {object} params
   * @return Promise<any>
   * */
  async get<T>(path: string, params = {}): Promise<SuccessType<T> | ErrorResponse> {
    return await this.provider.get(path, params);
  }

  /**
   * @param {string} path
   * @param {object} body
   * @param {object} params
   * @return Promise<any>
   * */
  async post<T>(
    path: string,
    body: { [key: string]: any },
    params = {},
  ): Promise<SuccessType<T> | ErrorResponse> {
    return await this.provider.post(path, body, params);
  }

  /**
   * @param {string} path
   * @param {object} body
   * @param {object} params
   * @return Promise<any>
   * */
  async edit<T>(
    path: string,
    body: { [key: string]: any },
    params = {},
  ): Promise<SuccessType<T> | ErrorResponse> {
    return await this.provider.edit(path, body, params);
  }

  /**
   * @param {string} path
   * @param {object} params
   * @return Promise<any>
   * */
  async remove<T>(path: string, params = {}): Promise<SuccessType<T> | ErrorResponse> {
    return await this.provider.remove(path, params);
  }
}

const $http = new HttpClient(BASE_API_URL, new AxiosProvider(BASE_API_URL));

export { $http };
