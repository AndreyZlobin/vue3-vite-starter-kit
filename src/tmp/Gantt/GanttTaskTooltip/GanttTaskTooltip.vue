<template>
  <div
    class="popover"
    v-if="showTooltip"
    :style="{ ...popoverStyles, width: `${width}px` }"
  >
    <div class="popover__title" :style="titleStyles">
      {{ title }}
    </div>

    <small class="popover__period">
      <slot></slot>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    popoverStyles: { type: Object, default: () => ({}), required: true },
    title: { type: String, default: '', required: true },
    width: { type: String, default: '300', required: false },
    showTooltip: { type: Boolean, default: false, required: true },
    color: { type: String, default: '#57a003', required: false },
  },
  computed: {
    titleStyles() {
      return {
        borderLeft: `3px solid ${this.color}`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.popover {
  color: #222;

  position: absolute;
  z-index: 1001;
  box-shadow: 0 0.2em 2em -0.1em rgba(0, 0, 0, 0.4);
  background: #f7f7f7;
  padding: 0.7em;
  border-radius: 8px;
  line-height: 1;

  &__title {
    font-size: 0.9em;
    padding-left: 0.5em;
    margin-bottom: 1em;
    border-left: 3px solid;
  }

  &__period {
    font-size: 0.7em;
    padding: 0.3em 0.5em;
    background: #e4edfb;
    border-radius: 4px;
    color: #3d75e4;
  }
}
</style>
