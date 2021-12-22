import { FormElementInjection, ProviderInjectEnums } from "~/components/ui/form-lib";
import { getCurrentInstance, inject, onBeforeUnmount, onMounted } from "vue";

export function formElementInjection(validate: () => boolean) {
  const form = inject<FormElementInjection>(ProviderInjectEnums.FORM);
  const uid = getCurrentInstance()?.uid;
  onMounted(() => {
    form && uid && typeof validate === "function" && form.bind({ validate, uid });
  });
  onBeforeUnmount(() => {
    form && uid && form.unbind(uid);
  });
}
