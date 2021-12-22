<template>
  <main class="px-4 py-10 text-center text-blue-400 dark:text-gray-200 h-screen">
    <h1 class="title-big">Извините, страница, которую вы посетили, не существует</h1>
    <router-link to="/" class="link text-xl">На главную</router-link>
    <div class="w-full items-center justify-center">
      <v-icon name="404" width="300" height="300" class="m-auto" />
    </div>
    <router-view />
  </main>
</template>

<script lang="ts">
import VIcon from "~/components/ui/v-icon/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { VIcon },
});
</script>
