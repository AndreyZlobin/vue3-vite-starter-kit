import { RouteRecordRaw } from "vue-router";

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: "/settings",
    name: "Настройки",
    meta: {
      layout: "default",
    },
    component: () => import("~/pages/settings/index.vue"),
  },
];
