import { shallowMount } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";

export const createWrapper = (component: ComponentPublicInstance, options: any) => {
  return shallowMount(component, {
    ...options,
  });
};
