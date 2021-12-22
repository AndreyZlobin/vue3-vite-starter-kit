import { Employee } from "~/types";
import { $http } from "~/core/api/http";
import { handlerError } from "~/utils";

export async function fetchEmployeeByNickname(): Promise<{ data: Employee } | void> {
  const res = await $http.get<Employee>("");
  if ("success" in res) {
    return {
      data: res.data as Employee,
    };
  } else {
    handlerError(res);
  }
}
