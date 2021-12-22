<template>
  <div class="gantt-check">
    <div class="gantt-check__wrapper">
      <input
        class="gantt-check__control"
        type="checkbox"
        v-model="value"
        @click="handlerChange"
      />
      <p class="gantt-check__text">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: { type: Boolean, default: false, required: true },
    title: { type: String, default: '', required: false },
  },
  data() {
    return {
      value: false,
    };
  },
  methods: {
    handlerChange() {
      this.value = !this.value;
      this.$emit('change', this.value);
    },
  },

  mounted() {
    this.value = this.model;
  },
};
</script>

<style scoped lang="scss">
.gantt-check {
  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__control {
    margin-right: 12px;
    cursor: pointer;

    width: 16px;
    height: 16px;

    background: #3d75e4;
    border-radius: 2px;
  }

  &__text {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #04153e;
  }
}
</style>
