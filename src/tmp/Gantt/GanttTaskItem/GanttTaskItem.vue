<template>
  <div v-if="Object.keys(task).length" class="task" :class="{ task_child: depth > 1 }">
    <task-item
      :task="task"
      :style="{ ...taskStyles, ...marginStyles }"
      @on-click="createRelations"
    />
    <!--        :style="{ ...task.style, ...marginStyles }"-->

    <gantt-task-item
      v-for="(item, index) in childTasks"
      :key="`${item.id}_${index}`"
      :children="item.children"
      :task="item"
      :columns="columns"
      :min-max="minMax"
      :depth="depth + 1"
      :task-style="{ ...item.style, ...marginStyles }"
      @on-click="createRelations"
    />
  </div>
</template>

<script lang="ts">
import TaskItem from "../TaskItem/TaskItem.vue";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GanttTaskItem",
  components: { TaskItem },

  props: {
    task: { type: Object, default: () => ({}), required: true },
    children: { type: Array, default: () => [], required: true },
    depth: { type: Number as PropType<number>, default: () => 0, required: true },
    columns: { type: Number as PropType<number>, default: () => 0, required: true },
    minMax: { type: Array as PropType<number[]>, default: () => [], required: true },
  },
  setup(props, { emit }) {
    const taskStyles = computed(() => {
      const widthMonth = 64;
      const start = props.task.start / 1000;
      const end = props.task.end / 1000;

      const rowLength = widthMonth * props.columns;
      const [min, max] = props.minMax;
      const minDate = new Date(min).getFullYear();
      const maxDate = new Date(max).getFullYear();
      const startDateGrid = new Date(`${minDate}-${1}-1 00:00:00`).getTime() / 1000;
      const endDateGrid = new Date(`${maxDate}-${12}-${31} 23:59:59`).getTime() / 1000;

      const timeColumn = (endDateGrid - startDateGrid) / props.columns;

      let leftPositionLine = 0;
      if (start > startDateGrid) {
        leftPositionLine = ((start - startDateGrid) / (endDateGrid - startDateGrid)) * 100;
        leftPositionLine = (leftPositionLine * rowLength) / 100;
      }

      // Линия финиша
      let rightPositionLine = leftPositionLine - 100 || 0;
      if (end <= endDateGrid) {
        rightPositionLine = ((end - startDateGrid) / (endDateGrid - startDateGrid)) * 100;
        rightPositionLine = (rightPositionLine * rowLength) / 100;
      }

      // const rowHeight = props.config.rowHeight;

      // const taskHeight = props.config.taskHeight;

      // const rowTaskPadding = props.config.rowTaskPadding;

      // const rows = props.data.length;

      // const task = tasksList[rowIndex - 1];
      //
      // let taskLength = 1;
      //
      // if (task) taskLength = task.taskLength;
      //
      // const totalRowHeight =
      //     rowIndex === 0 ? rowHeight : taskHeight * taskLength + taskHeight;

      // const rowOffset =
      //     rowIndex === 0
      //         ? totalRowHeight * (rowIndex + 1) + rowTaskPadding
      //         : totalRowHeight * (rowIndex + 1) +
      //         rowTaskPadding +
      //         (rowHeight + taskHeight) * rowIndex;
      let width = rightPositionLine - leftPositionLine;
      if (start === end || start > end || width < 16) {
        width = 16;
      }
      // if (offset) {
      //   width = width - 5;
      // }
      return {
        left: `${leftPositionLine}px`,
        // width: `${width >= 0 ? width : 0}px`,
        width: `${width}px`,

        // rowOffset,
        // rows,
        // rowLength,
        timeColumn,
      };
    });

    const marginStyles = computed(() => {
      return {
        marginTop: `${props.depth <= 1 ? 40 / 2 - 9 : 0}px`,
        marginBottom: `${props.children.length && props.task.showChild ? 21 : 21}px`,
      };
    });

    const childTasks = computed(() => {
      return props.task.showChild ? (props.children.length ? props.children : null) : null;
    });

    // function createRelations({element, taskId}) {
    function createRelations() {
      // emit('on-click', {element, taskId});
      emit("on-click");
    }

    return {
      taskStyles,
      marginStyles,
      childTasks,
      createRelations,
    };
  },
});
</script>

<style lang="scss">
.line-direction {
  height: 0;
  border-bottom: 2px solid;
  transform-origin: 0 0;
  z-index: 100;
  border-color: #113079;

  margin-left: 1px;
  position: absolute;

  cursor: pointer;

  &::before {
    //z-index: 1000;
    position: absolute;
    content: "";

    cursor: pointer;
    height: 20px;
    width: 100%;
    top: -10px;
    right: 0;
  }

  &--end {
    &::after,
    &::before {
      //z-index: 1000;
      position: absolute;
      content: "";
      background: #113079;

      cursor: pointer;
      height: 2px;
      width: 10px;
      top: -4px;
      right: 1px;

      transform: rotate(45deg);
    }

    &::before {
      top: 4px;
      transform: rotate(-45deg);
    }
  }
}

.gantt_task {
  position: absolute;
  width: 100%;
  z-index: 100;
}

.task {
  position: relative;
  width: 100%;
  margin: 2px 0;
  padding-left: 2px;

  &_child {
    padding-top: 22px;
    border-top: 1px solid rgba(228, 237, 251, 0.8);
  }

  &-item {
    z-index: 1000;
  }
}

.main-task {
  position: relative;
}

.child-task {
  position: relative;
}

.default {
  background: #81abee;
  color: #fff;
}

.blue {
  border-left-color: #3d75e4;
  background: #e4edfb;
}

.red {
  border-left-color: #e14761;
  background: #fbe9ec;
}

.green {
  border-left-color: #57a003;
  background: #e3f3d8;
}

.yellow {
  border-left-color: #d06e0b;
  background: #fbecdd;
}

.purple {
  border-left-color: #9954f2;
  background: #efe8fc;
}
</style>
