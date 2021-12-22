<template>
  <span
    class="
      flex
      items-center
      justify-center
      h-20
      w-20
      mr-3
      bg-blue-600
      text-white-400
      rounded-full
      font-bold
      text-4xl
    "
  >
    {{ shortUsername }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { toShortname } from "~/utils";

export default defineComponent({
  name: "VAvatar",
  props: {
    classes: { type: String as PropType<string>, default: "" },
    username: { type: String as PropType<string>, default: "" },
  },
  setup(props) {
    const shortUsername = computed(() => toShortname(props.username));
    return { shortUsername };
  },
});
</script>

<style scoped></style>
