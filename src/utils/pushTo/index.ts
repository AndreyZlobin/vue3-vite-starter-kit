import { router } from "~/core/router";

export function pushTo(path: string): void {
  router.push(path);
}
