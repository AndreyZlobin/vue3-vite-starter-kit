import { provide, reactive } from "vue";
import { ProviderInjectEnums, ComponentWithValidate } from "~/components/ui/form-lib";

export function formComponentProvide() {
  provide(ProviderInjectEnums.FORM, {
    bind,
    unbind,
  });
  const state = reactive<{ validateComponents: ComponentWithValidate[] }>({
    validateComponents: [],
  });

  function bind(component: ComponentWithValidate & { validate: () => boolean }) {
    state.validateComponents.push(component);
  }
  function unbind(uid: number) {
    const index = state.validateComponents.findIndex((c) => c.uid === uid);
    if (index > -1) {
      state.validateComponents.splice(index, 1);
    }
  }
  function validate() {
    let valid = true;
    for (const component of state.validateComponents) {
      const result = component.validate();
      if (!result) {
        valid = false;
      }
    }
    return valid;
  }
  return { validate, state };
}
