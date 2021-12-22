import { TASKS_ENDPOINTS } from "~/core/api/endpoints";
import { $http } from "~/core/api/http";
import { handlerError } from "~/utils";
import { Task } from "~/types";

const { getProjectTasksWithLimit, getTask } = TASKS_ENDPOINTS;
type Result = {
  data: Task[];
  total: number;
};

export async function fetchProjectTasks(
  projectId: string,
  params: { limit: number; offset: number },
): Promise<Result | void> {
  const res = await $http.get<Result>(
    getProjectTasksWithLimit(projectId, params.limit, params.offset),
  );

  if ("success" in res) {
    return {
      total: res.data.total,
      data: res.data.data,
    } as Result;
  } else {
    handlerError(res);
  }
}
export async function fetchTask(taskId: string): Promise<{ data: Task } | void> {
  const res = await $http.get<Task>(getTask(taskId));

  if ("success" in res) {
    return {
      data: res.data as Task,
    };
  } else {
    handlerError(res);
  }
}
