/**
 * @copyright Злобин Андрей Сергеевич email zlobin.andy@gmail.com 2021
 */
/**
 * @version 0.9.0
 */
import { createApp } from "vue";
import App from "./App.vue";

import "./tailwind.scss";
import "./index.scss";
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
import "virtual:windi-devtools";
import "virtual:svg-icons-register";

import { clickOutside } from "~/shared/directives";
import { popoverDirective } from "~/shared/directives/popover";

const app = createApp(App);

app.directive("click-outside", clickOutside);
app.directive("tooltip", popoverDirective);
Object.values(import.meta.globEager("./plugins/*.ts")).forEach((i) => i.install?.(app));
app.config.errorHandler = (err) => {
  console.log(err);
};

async function initApplication(): Promise<void> {
  app.mount("#app");
}

initApplication().then(() => {
  console.log("[APP]: Application has been started");
});
