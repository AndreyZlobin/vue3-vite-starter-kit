import { ref, onMounted, computed, SetupContext, nextTick } from "vue";
import { Rule } from "~/shared/hooks/validator/types";
import { useValidator } from "~/shared/hooks/validator/use-validator";

type OptionsProp = { [key: string]: string };

interface Props {
  idValue: string;
  textValue: string;
  options: OptionsProp[];
  rules?: Rule[];
  value: OptionsProp;
}

export function useSelect(props: Props, context: SetupContext) {
  const optionsVisible = ref(false);
  const input = ref(null);
  const rootValue = ref({
    [props.idValue]: "",
    [props.textValue]: "",
  });
  const validateValue = ref("");

  const { v$ } = useValidator(validateValue, props.rules || []);

  const validate = (): boolean => {
    v$.$touch();
    return v$.$valid.value;
  };
  const reset = (): void => {
    v$.$reset();
  };

  const emitValue = (value: OptionsProp) => {
    context.emit("update:modelValue", value);
  };

  const showOptionsList = (): void => {
    optionsVisible.value = true;
  };

  const hideOptionsList = (): void => {
    if (optionsVisible.value) {
      validate();
    }
    optionsVisible.value = false;
  };

  const onClickSelect = (): void => {
    showOptionsList();
  };

  const onClear = async () => {
    await nextTick();
    handlerSelectOption({ [props.idValue]: "", [props.textValue]: "" });
  };

  const handlerSelectOption = (option: OptionsProp) => {
    rootValue.value = option;
    validateValue.value = option[props.textValue];
    emitValue(option);
    hideOptionsList();
  };

  const hasError = computed<boolean>(() => v$.$error.value && v$.$dirty.value);
  const hasSuccess = computed<boolean>(() => !v$.$error.value && v$.$dirty.value);

  const setClasses = computed(() => {
    return {
      "border border-red-400": hasError.value,
    };
  });

  onMounted(() => {
    rootValue.value = props.value;
    validateValue.value = props.value[props.textValue];
  });

  return {
    optionsVisible,
    input,
    rootValue,
    validateValue,
    hasError,
    hasSuccess,
    setClasses,
    v$,
    validate,
    reset,
    onClear,
    hideOptionsList,
    handlerSelectOption,
    onClickSelect,
  };
}
