<template>
  <div>modal</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true, default: false },
  },
  setup(_, { emit }) {
    const handleOk = (e: MouseEvent) => {
      emit("toggle");
    };
    return {
      handleOk,
    };
  },
});
</script>
<style lang="less"></style>
