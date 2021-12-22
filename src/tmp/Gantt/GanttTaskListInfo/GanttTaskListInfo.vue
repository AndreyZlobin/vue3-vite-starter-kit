<template>
  <div class="gantt_task_info">
    <div class="gantt_task_info-cell" ref="infoCell">
      <p class="gantt_task_info-title gantt_task_info-title--first">
        Ключевые события
        <span class="gantt_task_info-select-all" @click="handlerSelectAll"
        >Выбрать все</span
        >
      </p>
    </div>

    <div
        v-for="(task, index) in tasksList"
        :key="index"
        :task="`task__${index}`"
        :style="rowStyles(index + 1)"
        class="gantt_task_info-cell"
    >
      <gantt-task-info
          :children="task.children"
          :key="`${task.id}_${index}`"
          :selected-task="selectedTask"
          :task="task"
          :depth="0"
          @task-toggle="taskToggleHandler"
          @on-select="handlerSelect"
          @on-click="handlerTaskClick"
      />
    </div>
  </div>
</template>

<script>
import GanttTaskInfo from '../GanttTaskInfo/GanttTaskInfo.vue';

export default {
  components: {GanttTaskInfo},
  props: {
    tasksList: {type: Array, required: true},
    selectedTask: {type: Array, required: true},
    rowStyles: {type: Function, required: true},
  },
  methods: {
    handlerSelectAll() {
      this.$emit('on-select-all');
    },
    handlerSelect(id) {
      this.$emit('on-select', id);
    },
    handlerTaskClick(id) {
      this.$emit('on-click', id);
    },
    taskToggleHandler(id) {
      this.$emit('task-toggle', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.gantt_task_info {
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 20%;

  border-right: 1px solid #e4edfb;

  &-select-all {
    margin-left: 8px;
    font-size: 13px;
    line-height: 16px;
    color: #3d75e4;
    cursor: pointer;
  }
}
</style>
