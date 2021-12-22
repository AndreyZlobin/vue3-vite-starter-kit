<template>
  <div class="gantt_task_info-item">
    <div class="gantt_task_info-title">
      <gantt-checkbox
          class="gantt_task_info-checkbox"
          :style="checkboxIndent"
          :toggle="task.showChild"
          @on-click="taskToggleHandler(task.id)"
      />

      <gantt-select
          :style="checkboxIndent"
          @on-click="handlerSelect(task.id)"
          :selected="isTaskSelected"
      />
      <p class="gantt_task_info-text" :style="indent" @click="handlerTaskClick(task.id)">
        {{ task.title }}
      </p>
    </div>

<!--    <gantt-task-info-->
<!--        v-for="(child, index) in childTasks"-->
<!--        :key="`${child.id}_${index}`"-->
<!--        :children="child.children"-->
<!--        :task="child"-->
<!--        :depth="depth + 1"-->
<!--        :selected-task="selectedTask"-->
<!--        @on-select="handlerSelect"-->
<!--        @on-click="handlerTaskClick"-->
<!--        @task-toggle="taskToggleHandler"-->
<!--    />-->
  </div>
</template>

<script>
// import GanttTaskInfo from './GanttTaskInfo.vue';
import GanttCheckbox from '../GanttCheckbox/GanttCheckbox.vue';
import GanttSelect from '../GanttSelect/GanttSelect.vue';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'GanttTaskInfo',
  // components: {GanttTaskInfo, GanttSelect, GanttCheckbox},
  components: { GanttSelect, GanttCheckbox},

  props: {
    task: {type: Object, required: true},
    children: {type: Array, required: true, default: () => []},
    selectedTask: {type: Array, required: true},
    depth: {type: Number, required: true, default: 0},
  },

  computed: {
    isTaskSelected() {
      return this.selectedTask.includes(this.task.id);
    },
    childTasks() {
      return this.task.showChild ? this.children : null;
    },

    indent() {
      return {
        transform: `translate(${this.depth === 0 ? 24 : (this.depth + 1) * 24}px)`,
      };
    },

    checkboxIndent() {
      return {
        ...this.indent,
        marginRight: '12px',
      };
    },
  },
  methods: {
    handlerSelect(id) {
      this.$emit('on-select', id);
    },

    handlerTaskClick(id) {
      this.$emit('on-click', id);
    },
    taskToggleHandler(id) {
      if (this.task.children.length) {
        this.$emit('task-toggle', id);
      }
    },
  },
});
</script>

<style lang="scss">
.gantt_task_info {
  p {
    margin: 0;
  }

  &-cell {
    padding: 0;
    font-size: 16px;
    line-height: 20px;
    color: #04153e;
    border-bottom: 1px solid #e4edfb;

    &:first-child {
      padding: 0;
      border: none;
    }
  }

  &-text {
    width: 80%;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 12px;
  }

  &-title {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0;
    padding-right: 24px;
    min-height: 59px;

    &--first {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      height: 128px;
      font-weight: 700;
      border-bottom: 1px solid #e4edfb;
    }
  }

  &-item {
    position: relative;
    min-height: 59px;
    max-width: 100%;
    width: inherit;
  }

  &-showing {
    position: absolute;
    top: 0;
    right: 0;

    width: 28px;
    height: 100%;

    border-left: 1px solid #e4edfb;

    cursor: pointer;
  }
}
</style>
