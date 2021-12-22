import { ref, onMounted, computed, watch, SetupContext } from "vue";
import { debounce } from "~/utils/debounce";
import { useValidator } from "~/shared/hooks/validator/use-validator";
import { Rule } from "~/shared/hooks/validator/types";

interface Props {
  value: string;
  delay: number;
  rules?: Rule[];
}

export function useInput(props: Props, context: SetupContext) {
  const rootValue = ref("");
  const blur = ref(false);
  const focus = ref(false);

  const { v$ } = useValidator(rootValue, props.rules || []);
  watch(
    () => props.value,
    (newValue: string) => {
      if (!newValue) {
        rootValue.value = "";
      }
      if (newValue) {
        rootValue.value = newValue;
      }
    },
  );
  const input = ref(null);

  const onFocus = (): void => {
    focus.value = true;
  };

  const validate = (): boolean => {
    v$.$touch();
    return v$.$valid.value;
  };
  const reset = (): void => {
    v$.$reset();
  };

  const onBlur = (): void => {
    validate();
    blur.value = true;
    focus.value = false;
  };

  const onClear = (): void => {
    rootValue.value = "";
    reset();
  };

  const handlerInput = (event: InputEvent) => {
    const { value } = <HTMLInputElement>event.target;
    context.emit("input", value);
  };
  const onInput = props.delay ? debounce(handlerInput, props.delay) : handlerInput;

  const hasError = computed<boolean>(() => v$.$error.value && v$.$dirty.value);
  const hasSuccess = computed<boolean>(() => !v$.$error.value && v$.$dirty.value);

  const setClasses = computed(() => {
    return {
      "border border-red-400": hasError.value,
    };
  });
  onMounted(() => {
    rootValue.value = props.value;
  });

  return {
    rootValue,
    input,
    onInput,
    onFocus,
    onBlur,
    validate,
    onClear,
    blur,
    focus,
    hasError,
    hasSuccess,
    setClasses,
    v$,
  };
}
