import { TableColumns } from "~/types";

export const tasksTableColumns: TableColumns[] = [
  {
    title: "Номер",
    dataId: "extra",
    deep: ["key"],
    width: 10,
    sorted: true,
    empty: "",
  },
  {
    title: "Название",
    dataId: "title",
    width: 300,
    sorted: true,
    empty: "",
  },
  {
    title: "Постановщик",
    dataId: "extra",
    deep: [["fields", "creator", "displayName"]],
    width: 200,
    sorted: true,
  },
  {
    title: "Создано",
    dataId: "extra",
    deep: [["fields", "created"]],
    format: (v) => new Date(v)?.toLocaleDateString() || v,
    width: 10,
  },
  {
    title: "Исполнитель",
    dataId: "extra",
    width: 200,
    deep: [["fields", "assignee", "displayName"]],
    sorted: true,
  },
  {
    title: "Срок",
    dataId: "extra",
    deep: [["fields", "created"]],
    format: (v) => new Date(v)?.toLocaleDateString() || v,
    width: 10,
  },
  { title: "Статус", dataId: "status", width: 10 },
];
