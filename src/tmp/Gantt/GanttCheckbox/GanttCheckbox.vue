<template>
  <div class="gantt_checkbox" :class="checkboxClasses">
    <div class="gantt_checkbox_wrapper" @click="handleClick"></div>
  </div>
</template>

<script>
export default {
  props: {
    toggle: { type: Boolean, required: true, default: true },
  },
  computed: {
    checkboxClasses() {
      return {
        'gantt_checkbox--close': !this.toggle,
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style scoped lang="scss">
.gantt_checkbox {
  &_wrapper {
    position: relative;

    width: 16px;
    height: 16px;

    border: 1.5px solid #b3b8c1;
    box-sizing: border-box;
    border-radius: 2px;
    opacity: 0.72;
    cursor: pointer;

    &:hover {
      border: 3px solid #b3b8c1;
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 8px;
      height: 2px;

      background: #b3b8c1;

      transform: translate(-50%);

      content: '';
      pointer-events: none;
    }
  }

  &--close {
    &::after {
      position: absolute;
      bottom: 20%;
      left: 50%;

      width: 2px;
      height: 8px;

      background: #b3b8c1;

      transform: translate(-50%);

      content: '';
      pointer-events: none;
    }
  }
}
</style>
