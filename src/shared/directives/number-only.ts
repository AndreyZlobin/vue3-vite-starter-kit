const numberOnly = {
  beforeMount(el: HTMLInputElement | any): void {
    const numberOnlyEventHandler = () => {
      el.value = el.value.replace(/\D+/, "");
    };
    el.__vueKeyUpEventHandler__ = numberOnlyEventHandler;
    el.addEventListener("input", numberOnlyEventHandler);
  },
  unmounted: function (el: any): void {
    el.removeEventListener("input", el.__vueKeyUpEventHandler__);
  },
};

export { numberOnly };
