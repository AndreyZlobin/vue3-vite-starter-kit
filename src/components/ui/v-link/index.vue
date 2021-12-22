<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VLint",
  props: {
    text: { type: String as PropType<string>, default: "/" },
  },
});
</script>

<style scoped></style>
