<template>
  <div class="my-1 px-1 w-full" :class="positionStyles">
    <article class="overflow-hidden rounded-lg shadow-xl border-1 border-blue-100">
      <div>
        <header
          class="
            flex
            items-center
            justify-between
            leading-tight
            p-2
            md:p-4
            cursor-pointer
            transition-all
            hover:bg-gray-100
            duration-200
          "
          @click.self="handlerClick"
        >
          <p class="text-xl font-medium text-black pointer-events-none">
            {{ card?.[titleId] || "" }}
          </p>
          <span title="Добавить в избранное" class="cursor-pointer" @click.prevent="">
            <carbon-star class="hover:text-amber-300 transition-all duration-200" />
          </span>
        </header>
        <footer
          v-if="hasFooter"
          class="
            flex
            border-t-1 border-blue-200
            items-center
            justify-between
            leading-none
            p-2
            md:p-4
          "
        >
          <slot name="footer"></slot>
        </footer>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VCard",
  props: {
    card: { type: Object, required: true },
    titleId: { type: String, default: "title" },
    position: { type: String as PropType<string>, default: "tile" },
  },
  emits: {
    "on-click"(value: { [key: string]: any }): boolean {
      return !!Object.keys(value).length;
    },
  },
  setup(props, { slots, emit }) {
    const hasFooter = !!slots.footer;
    const positionStyles = computed(() =>
      props.position === "tile" ? "md:w-1/2 lg:my-4 lg:px-4" : "",
    );
    function handlerClick(): void {
      emit("on-click", props.card);
    }
    return { hasFooter, positionStyles, handlerClick };
  },
});
</script>
<style lang="scss" scoped>
.skeleton-box {
  position: relative;
  overflow: hidden;
  background-color: #e2e8f0;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 3s infinite;
    content: "";
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
