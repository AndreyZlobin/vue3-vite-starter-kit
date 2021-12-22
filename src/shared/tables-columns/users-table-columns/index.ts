import { TableColumns } from "~/types";

export const usersTableColumns: TableColumns[] = [
  {
    title: "ФИО",
    dataId: "fio",
    width: 10,
    sorted: true,
    empty: "",
    deep: ["name", "surname", "midname"],
  },
  {
    title: "Должность",
    dataId: "position",
    width: 250,
    deep: ["name"],
    sorted: true,
  },
  { title: "Email", dataId: "contacts", width: 250, deep: ["email"], sorted: true },
  { title: "Телефон", dataId: "contacts", width: 10, deep: ["mobile"] },
  { title: "Удалить", dataId: "", width: 10, customSlot: "remove" },
];
