<template>
  <div>
    <v-page-top class="mb-10" />
    <menu-settings />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VPageTop from "~/components/ui/v-page-top/index.vue";
import MenuSettings from "~/modules/settings/menu-settings.vue";

export default defineComponent({
  name: "SettingsPage",
  components: { MenuSettings, VPageTop },
});
</script>
