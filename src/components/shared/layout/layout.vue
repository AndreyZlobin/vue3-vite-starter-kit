<template>
  <main class="h-screen bg-blue-700 block sm:flex">
    <slot v-if="hasSidebar" name="sidebar"></slot>
    <section class="w-full overflow-hidden">
      <slot name="body"></slot>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  setup(_, ctx) {
    const hasSidebar = !!ctx.slots.sidebar;
    const hasHeader = !!ctx.slots.header;
    return { hasSidebar, hasHeader };
  },
});
</script>

<style scoped></style>
