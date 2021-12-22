import { TableColumns } from "~/types";

export const projectTeamTableColumns: TableColumns[] = [
  {
    title: "ФИО",
    dataId: "employee",
    width: 10,
    sorted: true,
    empty: "",
    deep: [
      ["fio", "name"],
      ["fio", "surname"],
      ["fio", "midname"],
    ],
  },
  {
    title: "Должность",
    dataId: "role",
    width: 250,
    deep: ["name"],
    sorted: true,
  },
];
