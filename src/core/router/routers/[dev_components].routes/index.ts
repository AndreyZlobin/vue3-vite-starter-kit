import { RouteRecordRaw } from "vue-router";

export const devComponentsRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "[DEV] компоненты",
    meta: {
      layout: "default",
    },
    component: () => import("~/pages/components/index.vue"),
  },
];
