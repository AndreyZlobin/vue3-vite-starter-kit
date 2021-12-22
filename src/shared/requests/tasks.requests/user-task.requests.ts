import { TASKS_ENDPOINTS } from "~/core/api/endpoints";
import { $http } from "~/core/api/http";
import { handlerError } from "~/utils";
import { Employee } from "~/types";

const { getUserTasks } = TASKS_ENDPOINTS;
type Result = {
  data: Employee[];
  total: number;
};

export async function fetchUserTasks(userId: string): Promise<Result | void> {
  const res = await $http.get<Result>(getUserTasks(userId));

  if ("success" in res) {
    return {
      total: res.data.total,
      data: res.data.data,
    } as Result;
  } else {
    handlerError(res);
  }
}
