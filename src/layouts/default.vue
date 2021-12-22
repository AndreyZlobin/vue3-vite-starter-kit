<template>
  <layout>
    <template #sidebar>
      <side-bar v-once />
    </template>
    <template #body>
      <router-view
        class="rounded-tl-5xl bg-blue-50 p-10-6 h-full overflow-y-auto overflow-x-hidden"
      />
    </template>
  </layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "~/components/shared/side-bar/index.vue";
import Layout from "~/components/shared/layout/layout.vue";

export default defineComponent({
  components: {
    Layout,
    SideBar,
  },
});
</script>
<style lang="scss">
.app-layout {
  margin: 0 16px;
}

.app-content {
  min-height: calc(100% - 36px);
}
</style>
