import { $http } from "~/core/api/http";
import { ErrorResponse, Merge, SuccessType } from "~/types";
import { handlerError } from "~/utils";

interface Success {
  success: boolean;
}

interface SuccessData<T> {
  load: boolean;
  data: T;
}

type Result<T> = Merge<Success, T>;

type ReturnType<T> = Promise<SuccessData<T> | void>;

export function useRequest() {
  const load = true;

  async function get<T>(path: string): Promise<ReturnType<T> | void> {
    const result: Result<SuccessType<T>> | ErrorResponse = await $http.get(path);
    if ("success" in result) {
      return {
        load: !load,
        data: result.data,
      };
    } else {
      handlerError(result);
    }
  }

  return {
    get,
  };
}
