import { DirectiveBinding } from "vue";
type El = HTMLElement | any;
const clickOutside = {
  beforeMount(el: El, binding: DirectiveBinding): void {
    const ourClickEventHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (event.target && !el.contains(target) && el !== target) {
        binding.value(event);
      }
    };
    el.__vueClickEventHandler__ = ourClickEventHandler;
    document.addEventListener("click", ourClickEventHandler);
  },
  unmounted(el: El): void {
    document.removeEventListener("click", el.__vueClickEventHandler__);
  },
};
export { clickOutside };
