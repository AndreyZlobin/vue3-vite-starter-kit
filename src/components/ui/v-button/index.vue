<template>
  <button
    class="
      flex
      items-center
      justify-center
      h-10
      min-w-10
      py-1
      px-3
      rounded-md
      tracking-wide
      focus:outline-none
      transition-all
      duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    :class="btnType"
    :disabled="btnDisabled"
    :title="text || 'кнопка'"
    @click="handleClick"
  >
    <slot></slot>
    <v-spinner v-if="loading" class="mr-2" />
    <span class="text-mb">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, watch } from "vue";
import { BtnTypesEnum } from "~/shared/enums";
import VSpinner from "~/components/ui/v-spinner/index.vue";
import { debounce } from "~/utils";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { Icon } from "~/types";

export default defineComponent({
  name: "VButton",
  components: { VSpinner },
  props: {
    text: { type: String as PropType<string>, default: "", required: false },
    icon: { type: String as PropType<Icon>, default: "", required: false },
    iconColor: { type: String as PropType<string>, default: "#fff", required: false },
    type: { type: String as PropType<keyof typeof BtnTypesEnum>, default: "base", required: false },
    loading: { type: Boolean as PropType<boolean>, default: false, required: false },
    delay: { type: Number as PropType<number>, default: 0, required: false },
    disabled: { type: Boolean as PropType<boolean>, default: false, required: false },
    back: { type: Boolean as PropType<boolean>, default: false, required: false },
  },
  emits: {
    click: null,
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    const btnDisabled: ComputedRef<boolean> = computed(() => props.loading || props.disabled);
    const btnType: ComputedRef<BtnTypesEnum> = computed(() => {
      return BtnTypesEnum[props.type];
    });
    const routeBack = ref("");

    props.back &&
      watch(
        () => route,
        (routeValue: RouteLocationNormalizedLoaded): void => {
          const fullRouteWithIds = routeValue.fullPath.split("/");
          fullRouteWithIds.pop();
          routeBack.value = `/${fullRouteWithIds.filter((it) => !!it).join("/")}`;
        },
        {
          deep: true,
          immediate: true,
        },
      );

    function clickCallback(): void {
      if (props.back) {
        router.push(routeBack.value);
      }
      ctx.emit("click");
    }

    const handleClick = props.delay ? debounce(clickCallback, props.delay) : clickCallback;

    return { btnType, btnDisabled, handleClick };
  },
});
</script>
