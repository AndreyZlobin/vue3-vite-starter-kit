<template>
  <section
    class="flex flex-col bg-blue-700 justify-between transition-width duration-200 relative"
    :class="collapsed ? 'w-70' : 'w-20'"
  >
    <div class="pt-2 transition-all duration-200">
      <v-menu :collapsed="collapsed" />
    </div>
    <button
      class="
        h-10
        bg-blue-400
        outline-none
        border-0
        focus:outline-none
        text-light-50
        flex
        items-center
        justify-center
        font-bold
        transition-all
        duration-300
        hover:bg-blue-500
      "
      :class="{ 'rounded-t-xl': !collapsed }"
      @click="handlerChangeSideBarCollapse"
    >
      <carbon-arrow-right class="text-lg" :class="{ 'transform-gpu rotate-180': collapsed }" />
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { storage } from "~/logic";
import { storageItems } from "~/shared/constants";
import VMenu from "~/components/ui/v-menu/index.vue";

const { MENU_COLLAPSED } = storageItems;
export default defineComponent({
  name: "SideBar",
  components: { VMenu },
  setup() {
    const collapsed = ref(true);
    const lStorage = storage();

    onMounted((): void => {
      const collapsedValue = lStorage.getItem<boolean>(MENU_COLLAPSED);
      if (collapsedValue !== null) {
        collapsed.value = collapsedValue;
      }
    });

    function handlerChangeSideBarCollapse(): void {
      collapsed.value = !collapsed.value;
      lStorage.setItem(MENU_COLLAPSED, collapsed.value);
    }

    return {
      collapsed,
      handlerChangeSideBarCollapse,
    };
  },
});
</script>
<style lang="less"></style>
