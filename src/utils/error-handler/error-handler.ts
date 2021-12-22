import { toast } from "~/utils/toast";
import { ErrorResponse } from "~/types";

interface HandlerErrorParams {
  showNoty: boolean;
}

function handlerError(
  result: ErrorResponse,
  callback?: () => void,
  params: HandlerErrorParams = { showNoty: true },
): void {
  if (params?.showNoty) {
    if (result?.response instanceof Array) {
      result.response.forEach((item) => toast.error(item?.message));
    }
    if (typeof result?.response === "string") {
      toast.error(result.response);
    }
  }
  if (callback && typeof callback === "function") {
    callback();
  }
}
export { handlerError };
