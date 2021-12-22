<template>
  <div class="v-switch">
    <label class="v-switch__item">
      <input
        type="checkbox"
        :value="value"
        :checked="value"
        v-bind="$attrs"
        @change="handleChange"
      />
      <div class="slider round"></div>
    </label>
    <span
      v-if="Boolean(title)"
      class="v-switch__title"
      :class="{ 'v-switch__title--checked': value }"
      >{{ title }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VSwitcher",
  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    title: { type: String as PropType<string>, default: "" },
  },
  emits: {
    "update:modelValue": null,
    "on-change": null,
  },
  methods: {
    handleChange(event: InputEvent): void {
      this.$emit("on-change", (event.target as HTMLInputElement).checked);
      this.$emit("update:modelValue", (event.target as HTMLInputElement).checked);
    },
  },
});
</script>
<style scoped>
.v-switch {
  display: flex;
  align-items: center;
}

.v-switch__item {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.v-switch__title {
  margin-left: 12px;
  color: #04153e;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  opacity: 0.72;
}

.v-switch__title--checked {
  opacity: 1;
}

.v-switch__item input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #3d75e4;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3d75e4;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
