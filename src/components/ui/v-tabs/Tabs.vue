<template>
  <div>
    <ul :class="['flex space-x-2', classes]">
      <li
        v-for="(tab, index) of tabs"
        :key="index"
        :class="getClasses(index)"
        class="
          flex
          items-center
          rounded-tl-md rounded-tr-md
          p-2
          overflow-hidden
          cursor-pointer
          font-medium
          hover:bg-blue-300 hover:text-light-50
          transition-all
          duration-200
        "
        @click="selectTab(index)"
      >
        {{ tab?.props?.title }}
      </li>
    </ul>
    <div class="h-0.5 bg-blue-300"></div>
    <div class="mt-5">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { provide, computed, ref, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Tabs",
  props: {
    modelValue: { type: Number as PropType<number>, default: 0 },
    classes: { type: String as PropType<string>, default: "", required: false },
    query: { type: String as PropType<string>, default: "", required: false },
  },
  emits: {
    "update:modelValue"(value: number): boolean {
      return typeof value === "number";
    },
  },
  setup(props, { emit }) {
    const active = computed<number>(() => props.modelValue);
    const tabs = ref([]);

    provide("tabsState", {
      active,
      tabs,
    });

    function selectTab(tab: number): void {
      emit("update:modelValue", tab);
    }

    function getClasses(index: number): string {
      return active.value === index ? "active bg-blue-400 box-content text-light-50" : "";
    }

    return {
      tabs,
      active,
      selectTab,
      getClasses,
    };
  },
});
</script>
