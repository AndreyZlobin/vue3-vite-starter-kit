<template>
  <div class="gantt_select">
    <div class="gantt_select_wrapper" :class="checkboxClasses" @click="handleClick">
      <svg
        v-if="selected"
        class="gantt_select-checked"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.4789 10.3115L2.91269 6.56757C2.81126 6.46012 2.69012 6.37414 2.55619 6.31455C2.42226 6.25496 2.27815 6.22292 2.13211 6.22026C1.83715 6.21489 1.55219 6.32952 1.33992 6.53894C1.23481 6.64263 1.1507 6.76647 1.09241 6.90339C1.03412 7.04031 1.00278 7.18763 1.00018 7.33694C0.994923 7.63847 1.10705 7.92978 1.3119 8.1468L5.59935 12.6526C5.83769 12.9045 6.1623 13.0199 6.47979 12.9972C6.79639 13.0199 7.1201 12.9045 7.35844 12.6526L14.6883 4.92562C14.893 4.70873 15.0051 4.41758 14.9998 4.11622C14.9946 3.81485 14.8724 3.52797 14.6603 3.31867C14.4481 3.10937 14.1633 2.99481 13.8685 3.00018C13.5737 3.00555 13.2931 3.13042 13.0884 3.34731L6.4789 10.3115Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggle: { type: Boolean, default: true },
    selected: { type: Boolean, default: false },
  },
  computed: {
    checkboxClasses() {
      return {
        'gantt_select_wrapper--selected': this.selected,
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
.gantt_select {
  &-checked {
    z-index: 100;
  }

  &_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 16px;
    height: 16px;

    border: 2px solid #3d75e4;
    border-radius: 2px;
    cursor: pointer;

    opacity: 0.32;

    &:hover {
      border: 3px solid #b3b8c1;
    }

    &--selected {
      opacity: 1;
      background-color: #3d75e4;
    }
  }
}
</style>
