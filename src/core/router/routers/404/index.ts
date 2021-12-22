import { RouteRecordRaw } from "vue-router";

export const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: "/404",
    name: "404",
    meta: {
      layout: "404",
    },
    component: () => import("~/pages/[...all].vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
  { path: "/:pathMatch(.*)", redirect: "/404" },
];
