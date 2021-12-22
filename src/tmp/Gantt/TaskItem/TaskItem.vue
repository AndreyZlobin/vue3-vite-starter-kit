<template>
  <div
      class="task-item"
      :data-task-id="task.id"
      :class="task.type || 'default'"
      @mouseover="mouseoverHanlder"
      @mouseout="showTooltip = false"
      @mousemove="mouseMoveHandler"
      @mouseleave="mouseLeaveHandler"
      ref="taskNode"
      v-if="task.start > 0"
  >
    <span
        class="relation-point relation-point--left"
        v-if="showRelationPoint"
        :data-id="task.id"
        @click.stop="relationLineClick"
    >
    </span>

    <gantt-task-tooltip
        :show-tooltip="showTooltip"
        :popover-styles="popoverStyles"
        :title="task.title"
    >
      {{ new Date(task.start).toLocaleDateString('ru-RU', localeDateFormat) }}
      –
      {{ new Date(task.end).toLocaleDateString('ru-RU', localeDateFormat) }}
    </gantt-task-tooltip>
  </div>
</template>

<script>
import {coordinateCircleQuarter} from "~/tmp/Gantt/helpers";
import {makeStyles} from "~/tmp/Gantt/gantt/css";
import GanttTaskTooltip from "~/tmp/Gantt/GanttTaskTooltip/GanttTaskTooltip.vue";

export default {
  components: {GanttTaskTooltip},
  props: {
    task: {type: Object, default: () => ({})},
    localeDateFormat: {
      type: Object,
      default: () => ({day: '2-digit', month: 'short', year: 'numeric'}),
    },
  },
  data() {
    return {
      showTooltip: false,
      showDelayTooltip: false,
      showFactTooltip: false,
      showFactDelayTooltip: false,

      showRelationPoint: false,
      showRelationLine: false,

      hold: false,
      X: 0,
      Y: 0,
      line: null,
    };
  },
  computed: {
    taskNode() {
      return this.$refs.taskNode;
    },

    relationLine() {
      return this.$refs.relationLine;
    },

    taskNodeCoordinates() {
      return this.$refs.taskNode.getBoundingClientRect();
    },

    popoverStyles() {
      return {
        top: `${this.Y}px`,
        left: `${this.X}px`,
        transform: `translateY(-100%)`,
      };
    },
  },
  methods: {
    mouseoverHanlder(event) {
      const element = event.target;
      const rootEl =
          element.classList.contains('task-item') ||
          element.classList.contains('task-item__title');
      if (rootEl) {
        this.showTooltip = true;
      }
    },
    relationLineClick(event) {
      const element = event.target;
      const rootEl = element.classList.contains('task-item')
          ? element
          : element.parentNode;

      this.$emit('on-click', {element: rootEl, taskId: this.task.id});
      const emit = (event, data) => this.$emit(event, data);

      const line = document.createElement('div');

      line.classList.add('relation-line');

      this.taskNode.insertAdjacentElement('beforeend', line);

      let lines = document.querySelectorAll('.relation-line');

      document.addEventListener('mousemove', mousemoveCallback);
      document.addEventListener('click', clickCallback);

      if (lines.length === 2) {
        document.removeEventListener('click', clickCallback);
        document.removeEventListener('mousemove', mousemoveCallback);
        lines.forEach((line) => line.remove());
      }

      function clickCallback(event) {
        const el = event.target;

        if (!el.classList.contains('relation-line')) {
          emit('on-click', {element: null, taskId: null});
          document.removeEventListener('click', clickCallback);
          document.removeEventListener('mousemove', mousemoveCallback);
          lines.forEach((line) => line.remove());
        }
      }

      function mousemoveCallback(event) {
        const {clientX, clientY} = event;

        const {top, left} = line.getBoundingClientRect();

        let dist = Math.sqrt(Math.pow(clientX - left, 2) + Math.pow(clientY - top, 2));
        dist = Math.max(0, dist - 3);
        if (!dist) return;

        const tan = (clientY - top) / (clientX - left);
        let angle = Math.atan(tan);

        if (coordinateCircleQuarter(left, clientX, top, clientY) === 2) {
          angle += Math.PI;
        } else if (coordinateCircleQuarter(left, clientX, top, clientY) === 3) {
          angle -= Math.PI;
        }
        makeStyles(line, {
          width: `${Math.round(dist)}px`,
          transform: `rotate(${angle}rad)`,
        });
      }
    },

    mouseLeaveHandler() {
      this.showRelationPoint = false;
      this.showTooltip = false;
      this.showDelayTooltip = false;
      this.showFactTooltip = false;
      this.showFactDelayTooltip = false;
    },

    mouseMoveHandler(event) {
      this.showRelationPoint = true;
      const {offsetX, offsetY, clientX} = event;
      const popoverWidth = 300;
      this.X =
          window.outerWidth - clientX <= popoverWidth
              ? offsetX - (popoverWidth + 10)
              : offsetX + 20;
      this.Y = offsetY + 20;
    },

    mouseMoveDelayHandler(event) {
      const {offsetX, offsetY} = event;
      this.X = offsetX + 20;
      this.Y = offsetY + 20;
    },
  },
};
</script>

<style lang="scss">
.relation-point {
  z-index: 100;

  position: absolute;
  top: 50%;

  height: 13px;
  width: 13px;

  transform: translateY(-50%);

  border: 1px solid #929292;
  border-radius: 6.5px;
  background-color: #f0f0f0;
  cursor: pointer;

  &--left {
    left: -20px;
  }

  &--right {
    right: -20px;
  }

  &:hover {
    background-color: #ffa011;
  }
}

.relation-line {
  z-index: 2;

  position: absolute;
  top: 50%;
  left: 0;

  height: 0;
  margin-left: 1px;

  border: 0 #ffa011;
  border-bottom: 2px dashed #ffa011;
  transform-origin: 0 0;

  cursor: grab;
}

.task-item {
  position: relative;
  //display: inline-flex;
  align-items: center;
  //width: 100%;
  padding: 0.5rem;
  height: 16px;

  border-radius: 4px;

  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    top: 0;

    display: block;
    height: 100%;
    width: 15px;

    content: '';
  }

  &::before {
    left: -15px;
  }

  &::after {
    right: -15px;
  }

  &__delay {
    position: absolute;
    height: 100%;
    align-items: center;
    padding: 0.5rem;
    background-color: rgb(241, 150, 165);
    border-radius: 4px;
    cursor: pointer;
  }

  &__fact {
    position: absolute;
    height: 16px;
    align-items: center;
    background-color: #214eb0;
    border-radius: 4px;
    cursor: pointer;
  }

  &__fact-delay {
    position: absolute;
    height: 100%;
    padding: 0.5rem;
    align-items: center;
    background-color: #e14761;
    border-radius: 4px;
    cursor: pointer;
  }
}

.task-item__title,
.task-item__period {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
