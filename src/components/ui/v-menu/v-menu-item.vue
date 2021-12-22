<template>
  <router-link
    :to="item.path"
    class="
      h-12
      flex
      items-center
      truncate
      p-3
      px-7
      mb-1
      tracking-wide
      cursor-pointer
      text-white-400
      opacity-80
      hover:text-light-50 hover:opacity-100
    "
    :class="[menuItemsClasses, { group: Boolean(item.animation) }]"
    @mouseenter="showTooltip = true"
    @mouseover="showTooltip = true"
    @mouseleave="showTooltip = false"
    @mouseout="showTooltip = false"
  >
    <component
      :is="item.icon"
      class="mr-2 text-xl absolute"
      :class="{ [item.animation]: Boolean(item.animation) }"
    />
    <span v-if="collapsed" class="menu-item__link relative left-0 ml-8 text-mb font-medium"
      >{{ item.title }}
    </span>
    <v-tooltip :text="item.title" :show="!collapsed && showTooltip" />
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import VTooltip from "~/components/ui/v-tooltip/index.vue";
import { MenuItem } from "~/types";

export default defineComponent({
  name: "VMenuItem",
  components: { VTooltip },
  props: {
    item: { type: Object as PropType<MenuItem>, default: () => ({}), required: true },
    collapsed: { type: Boolean as PropType<boolean>, default: true, required: true },
  },
  setup(props) {
    const showTooltip = ref(false);

    const menuItemsClasses = computed(() => ({
      "justify-center": !props.collapsed,
    }));

    return {
      menuItemsClasses,
      showTooltip,
    };
  },
});
</script>

<style scoped lang="scss">
.active {
  @apply bg-blue-800 opacity-100;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -2px;
    border-right: 6px solid #3d75e4;
    border-radius: 10px;
    background: #3d75e4;
    height: 36px;
    opacity: 1;
  }
}
</style>
