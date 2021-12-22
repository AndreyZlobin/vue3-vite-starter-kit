<template>
  <div class="v-checkbox" :class="{ 'v-checkbox--selected': $attrs.modelValue }">
    <div class="v-checkbox__fake" :class="{ 'v-checkbox__fake--selected': $attrs.modelValue }">
      <svg
        v-if="$attrs.modelValue"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="#3D75E4"
        xmlns="http://www.w3.org/2000/svg"
        class="v-checkbox__check svg-class"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.4789 10.3115L2.91269 6.56757C2.81126 6.46012 2.69012 6.37414 2.55619 6.31455C2.42226 6.25496 2.27815 6.22292 2.13211 6.22026C1.83715 6.21489 1.55219 6.32952 1.33992 6.53894C1.23481 6.64263 1.1507 6.76647 1.09241 6.90339C1.03412 7.04031 1.00278 7.18763 1.00018 7.33694C0.994923 7.63847 1.10705 7.92978 1.3119 8.1468L5.59935 12.6526C5.83769 12.9045 6.1623 13.0199 6.47979 12.9972C6.79639 13.0199 7.1201 12.9045 7.35844 12.6526L14.6883 4.92562C14.893 4.70873 15.0051 4.41758 14.9998 4.11622C14.9946 3.81485 14.8724 3.52797 14.6603 3.31867C14.4481 3.10937 14.1633 2.99481 13.8685 3.00018C13.5737 3.00555 13.2931 3.13042 13.0884 3.34731L6.4789 10.3115Z"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <input
      class="v-checkbox__field"
      type="checkbox"
      :value="value"
      :checked="value"
      v-bind="$attrs"
      @change="handleChange"
    />
    <span class="v-checkbox__title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VCheckbox",
  props: {
    title: { type: String as PropType<string>, default: "" },
    value: { type: Boolean as PropType<boolean>, required: true },
  },
  emits: {
    "update:modelValue": null,
  },
  methods: {
    handleChange(event: InputEvent): void {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).checked);
    },
  },
});
</script>

<style scoped lang="scss">
.v-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;

  &--selected {
    .v-checkbox__title {
      opacity: 1;
    }
  }

  &__fake {
    position: relative;
    display: inline-block;
    height: 16px;
    width: 16px;
    border-radius: 2px;
    border: 2px solid rgba(61, 117, 228, 0.32);

    &--selected {
      background: #3d75e4;
    }
  }

  &__check {
    position: absolute;
    right: 0;
    left: -2px;
    top: -2px;
    bottom: 0;
    pointer-events: none;
  }

  &__field {
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    user-select: none;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    appearance: none;
  }

  &__title {
    margin-left: 12px;
    color: #04153e;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.72;
    min-height: 24px;
    display: flex;
    align-items: center;
  }
}
</style>
