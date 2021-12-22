<template>
  <div class="gantt__task-types">
    <div class="gantt__task-types__wrapper">
      <div class="gantt__task-type" v-for="(type, index) in TASK_TYPE" :key="index">
        <span
          class="gantt__task-type-color"
          v-for="color in type.color"
          :style="`background-color:${color}`"
          :key="color"
        ></span>

        <p class="gantt__task-type-title">{{ type.title }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
const TASK_TYPE = [
  {
    title: 'Базовый',
    type: 'base',
    color: ['#81ABEE'],
  },
  {
    title: 'Просрочка',
    type: 'delay',
    color: ['#F196A5'],
  },
  {
    title: 'Факт',
    type: 'fact',
    color: ['#214EB0', '#E14761'],
  },
];

export default {
  data() {
    return {
      TASK_TYPE,
    };
  },
};
</script>
<style lang="scss" scoped>
.gantt__task-types {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;

  &__wrapper {
    display: flex;
  }
}

.gantt__task-type {
  display: flex;
  align-items: center;
  margin-right: 24px;

  &-color {
    display: flex;

    width: 16px;
    height: 16px;

    margin-right: 8px;

    border-radius: 4px;
  }

  &-title {
    margin: 0;
  }
}
</style>
