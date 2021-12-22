import { App } from "vue";
import { router } from "~/core/router";
export const install = (app: App): void => {
  app.use(router);
};
