import { Department } from "~/types";

export function departmentsTreeData(data: Department[]): Department {
  return <Department>data.find((it) => !it.parent || {}) || {};
}
