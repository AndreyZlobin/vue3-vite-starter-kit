<template>
  <div class="inline-flex flex-col items-center w-full">
    <span v-if="showIcon" class="text-8xl text-blue-400 mb-2">
      <v-icon :name="icon" height="180" width="180" />
    </span>
    <p class="text-gray-700 font-medium font-sans tracking-wide text-lg">{{ text }}</p>
    <slot v-if="noDataSlot" name="no-data"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import VIcon from "~/components/ui/v-icon/index.vue";
import { Icon } from "~/types";

export default defineComponent({
  name: "VNoData",
  components: { VIcon },
  props: {
    text: { type: String as PropType<string>, default: "Ничего не найдено" },
    showIcon: { type: Boolean as PropType<boolean>, default: true },
    icon: { type: String as PropType<Icon>, required: false, default: "empty" },
  },
  setup(_, { slots }) {
    const noDataSlot = !!slots.noData;
    return {
      noDataSlot,
    };
  },
});
</script>
