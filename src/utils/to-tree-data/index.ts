import { Company } from "~/types";

export * from "./departments-tree-data";

export function toTreeData(data: Company[]): Company {
  const res: Company = {
    id: 999,
    name: "Росатом",
    fullName: "Росатом",
    contacts: null,
    parent: [],
    children: [],
  };
  for (const company of data) {
    !company?.parent && res.children && res.children.push(company);
  }
  return res;
}
