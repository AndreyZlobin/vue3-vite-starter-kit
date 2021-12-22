<template>
  <div class="relative transition-all duration-150">
    <div
      class="
        relative
        h-10
        bg-blue-400 bg-opacity-7
        flex
        input
        rounded-md
        p-2
        cursor-text
        placeholder:text-blue-500
      "
      :class="setClasses"
    >
      <label
        class="
          absolute
          w-full
          pr-4
          z-10
          text-dark-900
          truncate
          text-opacity-60 text-base
          font-medium
          tracking-wide
          bg-transparent
          transition-all
          duration-200
          pointer-events-none
        "
        :class="focus || !!rootValue ? '-top-0.5 text-opacity-50 !text-sm' : 'top-1/6'"
      >
        {{ placeholder }}
      </label>

      <input
        ref="input"
        v-model="rootValue"
        class="outline-none bg-transparent h-full w-full font-medium text-sm relative top-1"
        :class="[classes]"
        :type="type"
        :readonly="readonly"
        :minLength="Boolean(minLength) ? minLength : null"
        :maxLength="Boolean(maxlength) ? maxlength : null"
        v-bind="$attrs"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>
    <transition name="list">
      <div v-if="Object.keys(v$.errors).length" class="flex flex-col">
        <p v-for="er in v$.errors" :key="er.id" class="text-red-400">{{ er.errorMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "vue";
import { useInput } from "~/shared/hooks";
import { Rule } from "~/shared/hooks/validator/types";
import { formElementInjection } from "~/components/ui/form-lib";

export default defineComponent({
  name: "VInput",
  props: {
    type: { type: String as PropType<string>, default: "text", required: false },
    value: { type: String as PropType<string>, default: "", required: true },
    delay: { type: Number as PropType<number>, default: 0, required: false },
    required: { type: Boolean as PropType<boolean>, default: false, required: false },
    readonly: { type: Boolean as PropType<boolean>, default: false, required: false },
    maxlength: { type: Number as PropType<number>, default: null, required: false },
    minLength: { type: Number as PropType<number>, default: null, required: false },
    placeholder: { type: String as PropType<string>, default: "", required: false },
    title: { type: String as PropType<string>, default: "", required: false },
    icon: { type: String as PropType<string>, default: "", required: false },
    errors: { type: Object, default: () => ({}), required: false },
    rules: { type: Array as PropType<Rule[]>, default: () => [] },
    classes: { type: String as PropType<string>, default: "", required: false },
  },
  emits: {
    input: (): boolean => {
      return true;
    },
  },
  setup(props, context: SetupContext) {
    const inputHook = useInput(props, context);
    if (props.rules?.length) {
      formElementInjection(inputHook.validate);
    }
    return {
      ...inputHook,
    };
  },
});
</script>

<style scoped lang="less">
.drop-enter-active,
.drop-leave-active {
  transition: all 0.2s ease-in-out;
}

.drop-enter-from,
.drop-leave-to {
  transform: translateY(-20%);
}
</style>
