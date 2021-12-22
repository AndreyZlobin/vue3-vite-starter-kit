<template>
  <transition name="fade">
    <div
      v-if="show"
      class="
        z-1000
        absolute
        left-22
        inline-flex
        min-w-20
        py-1
        px-2
        bg-blue-400
        rounded-md
        text-light-50
        shadow-xl
      "
    >
      <span
        class="
          absolute
          -left-2
          top-1/2
          -translate-y-1/2
          w-4
          h-4
          bg-blue-400
          transform
          rotate-45
          z-10
          pointer-events-none
        "
      ></span>
      <span class="z-11 text-sm font-light">{{ text }}</span>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VTooltip",
  props: {
    text: { type: String as PropType<string>, default: "", required: true },
    show: { type: Boolean as PropType<boolean>, default: false, required: false },
  },
});
</script>
<style lang="less" scoped>
//.fade-enter-active {
//  transition: 0.15s ease-in-out;
//}
//.fade-leave-active {
//  transition: 0.15s ease-in;
//}
//.fade-enter, .fade-leave-to {
//  opacity: 0;
//}
</style>
