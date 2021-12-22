import { notFoundRoutes } from "~/core/router/routers/404";
import { settingsRoutes } from "~/core/router/routers/settings.routes";
import { devComponentsRoutes } from "~/core/router/routers/[dev_components].routes";
import { errorPageRoutes } from "~/core/router/routers/error.routes";

export const routes = [
  ...settingsRoutes,
  ...devComponentsRoutes,
  ...notFoundRoutes,
  ...errorPageRoutes,
];
