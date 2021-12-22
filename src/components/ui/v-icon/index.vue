<template>
  <svg
    aria-hidden="true"
    class="icon icon-svg"
    :height="height"
    :width="width"
    @click="handleClick"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Icon } from "~/types";

export default defineComponent({
  name: "VIcon",
  props: {
    prefix: { type: String as PropType<string>, default: "icon" },
    name: { type: String as PropType<Icon>, required: true },
    color: { type: String as PropType<string>, default: "#fff" },
    height: { type: String as PropType<string>, default: "16" },
    width: { type: String as PropType<string>, default: "16" },
  },
  emits: { click: null },
  setup(props, { emit }) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    function handleClick(): void {
      emit("click");
    }

    return { symbolId, handleClick };
  },
});
</script>
