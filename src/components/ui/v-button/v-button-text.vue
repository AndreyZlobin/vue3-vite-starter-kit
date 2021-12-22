<template>
  <button
    class="flex items-center outline-none focus:outline-none border-none"
    @click="handleClick"
  >
    <v-icon v-if="!!icon" :name="icon" class="mr-1" />
    <span
      class="
        text-mb text-blue-300 text-mb
        font-medium
        hover:text-blue-400
        transition-all
        duration-200
      "
      >{{ text }}</span
    >
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import VIcon from "../v-icon/index.vue";
import { Icon } from "~/types";

export default defineComponent({
  name: "VButtonText",
  components: { VIcon },
  props: {
    icon: { type: String as PropType<Icon>, default: "" },
    text: { type: String as PropType<string>, default: "" },
  },
  emits: {
    click: null,
  },
  setup(_, { emit }) {
    function handleClick(): void {
      emit("click");
    }

    return {
      handleClick,
    };
  },
});
</script>

<style scoped></style>
