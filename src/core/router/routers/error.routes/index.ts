import { RouteRecordRaw } from "vue-router";

export const errorPageRoutes: RouteRecordRaw[] = [
  {
    path: "/error",
    name: "Ошибка",
    meta: {
      layout: "empty",
    },
    component: () => import("~/pages/error-page/index.vue"),
  },
];
