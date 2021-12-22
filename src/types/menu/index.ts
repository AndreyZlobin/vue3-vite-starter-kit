import { DefineComponent } from "vue";

export interface MenuItem {
  title: string;
  path: string;
  icon: DefineComponent;
  animation?: string;
  show?: boolean;
}
