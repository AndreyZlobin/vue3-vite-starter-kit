import { reactive, Ref, ref } from "vue";
import { Rule } from "~/shared/hooks/validator/types";

export function useValidator(fieldValue: Ref<string | number>, rules: Rule[]) {
  const _value = ref(fieldValue);
  const $valid = ref(true);
  const $dirty = ref(false);
  const $pending = ref(false);
  const $error = ref(false);
  let errors = reactive<{ [key: string | number]: { errorMessage: string; id: number } }>({});

  function $touch(): void {
    $dirty.value = true;
    _validate();
  }

  function $onPending(): void {
    $pending.value = true;
  }

  function $reset(): void {
    $dirty.value = false;
    $valid.value = true;
    $error.value = false;
    errors = {};
  }

  function _validate(): void {
    rules?.forEach((el, index) => {
      const isValid = el.rule(_value.value);
      if (!isValid) {
        errors[index] = { ...el, id: index };
      } else {
        delete errors[index];
      }
    });
    const hasError = Object.keys(errors).length;
    $error.value = Boolean(hasError);
    $valid.value = !hasError;
  }

  const v$ = {
    _value,
    $valid,
    $dirty,
    $error,
    errors,
    $touch,
    $reset,
    $onPending,
  };
  return { v$ };
}
