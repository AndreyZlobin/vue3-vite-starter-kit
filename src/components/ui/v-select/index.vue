<template>
  <div v-click-outside="hideOptionsList" class="relative transition-all duration-150">
    <div
      class="
        h-10
        bg-blue-400 bg-opacity-7
        flex
        input
        rounded-md
        relative
        cursor-text
        placeholder:text-blue-500
      "
      :class="setClasses"
    >
      <label
        class="
          z-10
          absolute
          w-full
          pr-4
          z-100
          left-2
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
        :class="Boolean(rootValue[textValue]) ? '-top-0.5 text-opacity-50 !text-sm' : 'top-1/6'"
      >
        {{ placeholder }}
      </label>
      <label class="relative">
        <input
          ref="select"
          v-model="rootValue[textValue]"
          type="text"
          :title="rootValue[textValue]"
          class="
            relative
            p-2
            h-full
            outline-none
            bg-transparent
            truncate
            w-11/12
            text-mb text-dark-900
            tracking-wide
            cursor-pointer
          "
          :class="[classes, { 'mt-1': Boolean(rootValue[textValue]) }]"
          readonly
          @click="onClickSelect"
        />
      </label>
      <span
        v-if="rootValue[textValue]"
        class="absolute right-2 top-1 cursor-pointer h-full"
        @click.prevent="onClear"
        >x</span
      >
      <ul
        v-if="optionsVisible && options.length"
        class="
          absolute
          z-100
          overflow-y-auto
          bg-light-50
          w-full
          min-h-15
          max-h-45
          top-10
          shadow-xl
          rounded-md
        "
      >
        <li
          v-for="option in options"
          :key="option.value"
          class="hover:bg-blue-400 hover:bg-opacity-7 cursor-pointer px-2 py-2 truncate text-base"
          :title="option[textValue]"
          :class="{ 'bg-blue-400 bg-opacity-7': option[textValue] === rootValue[textValue] }"
          @click="handlerSelectOption(option)"
        >
          {{ option[textValue] }}
        </li>
      </ul>
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
import { useSelect } from "~/shared/hooks";
import { Rule } from "~/shared/hooks/validator/types";
import { formElementInjection } from "~/components/ui/form-lib";

type OptionsProp = { [key: string]: string };

export default defineComponent({
  name: "VSelect",
  props: {
    name: { type: String as PropType<string>, default: "", required: false },
    idValue: { type: String as PropType<string>, default: "id", required: false },
    textValue: { type: String as PropType<string>, default: "name", required: false },
    options: { type: Array as PropType<OptionsProp[]>, default: () => [], required: true },
    placeholder: { type: String as PropType<string>, default: "", required: false },
    title: { type: String as PropType<string>, default: "", required: false },
    rules: { type: Array as PropType<Rule[]>, default: () => [] },
    value: { type: Object as PropType<OptionsProp>, default: () => ({}), required: true },
    classes: { type: String as PropType<string>, default: "", required: false },
    errors: { type: Object as PropType<OptionsProp>, default: () => ({}), required: false },
    required: { type: Boolean as PropType<boolean>, default: false },
  },
  emits: ["update:value", "update:modelValue"],
  setup(props, context: SetupContext) {
    const selectHook = useSelect(props, context);
    if (props.rules?.length) {
      formElementInjection(selectHook.validate);
    }
    return { ...selectHook };
  },
});
</script>
