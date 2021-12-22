import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import NProgress from "nprogress";
import { routes } from "~/core/router/routers";

const routesMain = setupLayouts(routes);
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: routesMain,
});
router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});
export { router };
