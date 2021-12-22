<template>
  <span :tooltip="tooltipText" :position="position"><slot /></span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VPopover",
  props: {
    tooltipText: {
      type: String as PropType<string>,
      default: "Tooltip text",
    },
    position: {
      type: String as PropType<string>,
      default: "top",
    },
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
