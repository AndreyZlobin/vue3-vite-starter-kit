<template>
  <nav>
    <ul class="flex">
      <li v-for="menuItem in menuItems" :key="menuItem.path">
        <router-link class="link mr-7" :to="menuItem.path">{{ menuItem.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PageMenuItem } from "~/types";

export default defineComponent({
  name: "VPageMenu",
  props: {
    menuItems: { type: Array as PropType<PageMenuItem[]>, required: true },
  },
});
</script>
