<template>
  <div class="board">
    <div class="gantt-area">
      <div ref="gantt" class="gantt">
        <gantt-task-list-info
          v-if="showInfo"
          class="gantt__info"
          :row-styles="rowStyles"
          :tasks-list="tasksList"
          :selected-task="selectedTask"
        />
        <div ref="taskWrapper" class="gantt__wrapper" :style="wrapperStyles">
          <gantt-task-years :map-of-years="mapOfYears" />
          <div ref="taskList" class="gantt_task_wrapper" :style="gantTaskWrapperStyles">
            <div class="gantt_wrapper_mask">
              <div
                v-for="item in getMonths.length"
                :key="item"
                class="gantt_wrapper_mask-item"
              ></div>
            </div>
            <template v-for="(item, rowIndex) in data" :key="item.id">
              <div class="gantt_task_row" :style="rowStyles(rowIndex)">
                <div class="gantt_task_item">
                  <gantt-task-item
                    :task="item"
                    :columns="columns"
                    :min-max="getMinMax"
                    :children="item?.children || []"
                    :depth="1"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GanttTaskListInfo from "../GanttTaskListInfo/GanttTaskListInfo.vue";
import GanttTaskYears from "../GanttTaskYears/GanttTaskYears.vue";
import GanttTaskItem from "../GanttTaskItem/GanttTaskItem.vue";
import GanttCheck from "../GanttCheck/GanttCheck.vue";
import { GANT_CONFIG } from "../gantt/ganttConfig";
import { computed, defineComponent, nextTick, onMounted, reactive, PropType } from "vue";
import { GantConfig, GantItem } from "~/types";
import { findMinMax } from "~/utils";

// import { LineCreator } from '@/shared/utils/LineCreator/lineCreator';

export default defineComponent({
  name: "GanttBoard",
  components: {
    GanttCheck,
    GanttTaskItem,
    GanttTaskYears,
    GanttTaskListInfo,
  },
  props: {
    data: { type: Array as PropType<GantItem[]>, default: () => [], required: true },
    addTask: { type: Boolean as PropType<boolean>, default: false, required: false },
    config: { type: Object as PropType<GantConfig>, default: () => GANT_CONFIG },
    tableData: { type: Object, default: () => ({}) },
    showTable: { type: Boolean as PropType<boolean>, default: false, required: false },
    showInfo: { type: Boolean as PropType<boolean>, default: false, required: false },
    boardType: { type: String as PropType<string>, default: "year", required: false },
  },
  setup(props) {
    onMounted(async () => {
      await nextTick();
      tasksListCreator();
    });

    const wrapperStyles = { height: "100%", width: `${80}%` };
    const cellWidth = 64;
    const minMonthInBoard = 2000;
    const currentMonth = new Date().toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
    });

    let monthsList: string[] = [];

    let tasksList = reactive<GantItem[]>([]);
    const selectedTask = reactive<GantItem[]>([]);
    const flatTasks = reactive<GantItem[]>([]);

    const getMinMax = computed(() => findMinMax(props.data));

    const listOfYears = computed(() => {
      const minMax = getMinMax.value;
      const min = new Date(minMax[0]).getFullYear();
      const max = new Date(minMax[1]).getFullYear();
      return [min, max];
    });
    const mapOfYears = computed(() => {
      let [min, max] = listOfYears.value;
      const yearsList = [];
      for (let year = min; year <= max + 1; year++) {
        yearsList.push(year);
      }
      return yearsList;
    });
    const columns = computed(() => (mapOfYears.value.length - 1) * props.config.monthInYear);

    const getMonths = computed(() => {
      let monthsList = `${props.config.months.join("_")}_`
        .repeat(mapOfYears.value.length)
        .split("_");
      mapOfYears.value.pop();
      return monthsList;
    });

    const rowLength = 64 * columns.value;
    const gantTaskWrapperStyles = { width: `${rowLength}px` };
    const showCurrentMonthPopover = listOfYears.value?.[1] > minMonthInBoard;

    function tasksListCreator() {
      props.data.forEach((item, index) => {
        const result = [];
        flatTasks.push(item);
        // const taskStyles = taskStyle(item.start / 1000, item.end / 1000, index);
        // const delayStyles = taskStyle(
        //     item.end / 1000,
        //     item.delay / 1000,
        //     index,
        //     true,
        // );
        // item.factStyles = taskStyle(
        //     item.start / 1000,
        //     item.executionDate / 1000,
        //     index,
        // );
        // item.factDelayStyles = taskStyle(
        //     item.end / 1000,
        //     item.executionDate / 1000,
        //     index,
        // );
        // if (item.factDelayStyles) item.style = taskStyles;
        // if (item.factDelayStyles)
        // item.style = taskStyles;
        // item.delayStyles = {...delayStyles, left: parseInt(taskStyle.width) + 5 + 'px'};

        item.showChild = !item?.children?.length;
        const getAllChildren = (task) => {
          task?.children?.length &&
            task.children.forEach((child, childIndex) => {
              child.showChild = true;
              flatTasks.push(task);

              // const childStyles = taskStyle(
              //     child.start / 1000,
              //     child.end / 1000,
              //     childIndex,
              // );
              //
              // const delayChildStyles = taskStyle(
              //     item.end / 1000,
              //     item.delay,
              //     childIndex,
              // );

              // child.style = childStyles;
              // child.delayStyles = {...delayChildStyles, left: childStyles.width};

              if (child?.children?.length) {
                result.push(child);
                getAllChildren(child, result);
              } else {
                result.push(child);
                return result;
              }
            });
        };

        getAllChildren(item);
        tasksList.push({
          ...item,
          showChild: true,
          // childList: result,
          // taskLength: result.length + 1,
        });
        // return {
        //   ...item,
        //   // showChild: true,
        //   // childList: result,
        //   // taskLength: result.length + 1,
        // };
      });
    }

    function rowStyles(rowIndex: number) {
      // const rowHeight = props.config.rowHeight;
      //
      // const taskHeight = 64;
      //
      // const task = tasksList[rowIndex - 1];
      //
      // let taskLength = 1;
      // if (task) taskLength = task.taskLength;
      //
      // const allTaskList = [task, ...getAllChildTask(task)];
      // const hiddenElements = [];
      //
      // allTaskList.forEach((item) => {
      //   if (item && !item.showChild && item.children.length) {
      //     hiddenElements.push(...getAllChildTask(item));
      //   }
      // });
      //
      // const unique = [...new Set(hiddenElements)];
      // const showElements = taskLength - unique.length;
      // // rowIndex === 0 ? rowHeight + 48 : taskHeight * showElements - 4 * showElements;
      // // rowIndex === 0 ? rowHeight : taskHeight * showElements - 4 * showElements;

      const totalRowHeight = 64;
      return {
        height: `${totalRowHeight}px`,
        // width: `${rowLength}px`
      };
    }

    function getAllChildTask(task: GantItem) {
      // const mainTask = {...task, children: []};
      const mainTask = { ...task };

      if (!task || !task?.children?.length) return [];

      const getAllChildren = (task: GantItem) => {
        task?.children?.length &&
          task.children.forEach((child: GantItem) => {
            if (child && child.children && child.children.length) {
              mainTask.children.push(child);
              getAllChildren(child);
            } else {
              mainTask.children.push(child);
              return mainTask;
            }
          });
      };
      getAllChildren(task);

      return mainTask.children;
    }

    return {
      wrapperStyles,
      cellWidth,
      minMonthInBoard,
      currentMonth,
      tasksList,
      selectedTask,
      flatTasks,
      getMinMax,
      listOfYears,
      mapOfYears,
      columns,
      getMonths,
      gantTaskWrapperStyles,
      rowLength,
      showCurrentMonthPopover,

      monthsList,
      rowStyles,
      getAllChildTask,
    };
  },
  // data() {
  //   return {
  //     tasksList: [],
  //     selectedTask: [],
  //     flatTasks: [],
  //     wrapperStyles: {
  //       height: '100%',
  //       width: '80%',
  //     },
  //   };
  // },
  // computed: {
  //   rowLength() { // +
  //     return 64 * this.columns
  //   },
  //   gantTaskWrapperStyles() { // +
  //     return {
  //       width: '100%',
  //     };
  //   },
  //   currentMonth() { // +
  //     const dateFormat = {
  //       day: '2-digit',
  //       month: 'short',
  //     };
  //     return new Date().toLocaleDateString('ru-RU', dateFormat);
  //   },
  //
  //   getMinMax() { // +
  //     return findMinMax(this.data);
  //   },
  //
  //   listOfYears() { // +
  //     const minMax = this.getMinMax;
  //     const min = new Date(minMax[0]).getFullYear();
  //     const max = new Date(minMax[1]).getFullYear();
  //     return [min, max];
  //   },
  //
  //   columns() { // +
  //     return this.mapOfYears.length * this.config.monthInYear
  //   },
  //
  //   getMinTaskTime() { // -
  //     return this.getMinMax[0]
  //   },
  //
  //   getMaxTaskTime() { // -
  //     return this.getMinMax[1]
  //   },
  //
  //   getUnixTime() { // +
  //     const yearsLit = this.mapOfYears.map((item) => item.title);
  //     return getYearsUnixTime(yearsLit);
  //   },
  //
  //   cellWidth() {
  //     // const boardWidth = 100; // %
  //     // const monthQuantity = this.getMonths.length;
  //     // const cellWidth = boardWidth / monthQuantity;
  //     return 64;
  //   },
  //
  //   showCurrentMonthPopover() { // +
  //     const minMonthInBoard = 2000;
  //     return this.listOfYears?.[1] > minMonthInBoard;
  //   },
  //
  //   cellStyle() {
  //     const boardWidth = 100;
  //     const monthQuantity = this.getMonths.length;
  //     const cellWidth = boardWidth / monthQuantity;
  //     const styles = {
  //       // minWidth: `${this.cellWidth}px`,
  //       width: `${this.cellWidth}px`,
  //       fontSize: `${cellWidth < 2.5 ? 10 : 13}px`,
  //     };
  //     return styles;
  //   },
  //
  //   mapOfYears() {
  //     const [min, max] = this.listOfYears;
  //     const monthInYear = this.config.monthInYear;
  //
  //     const yearsList = [];
  //
  //     for (let year = min; year <= max; year++) {
  //       yearsList.push(year);
  //     }
  //
  //     const res = yearsList.map((el, index) => ({
  //       title: el,
  //       start: (index + 1) * monthInYear,
  //       end: (index + 1) * (monthInYear + monthInYear),
  //     }));
  //     return res;
  //   },
  //
  //   getMonths() {
  //     const monthsList = this.mapOfYears.reduce((acc) => {
  //       return [...acc, ...this.config.months];
  //     }, []);
  //     return monthsList;
  //   },
  //   getTaskWrapper() {
  //     return this.$refs.taskWrapper;
  //   },
  // },
  // /* async */mounted() {
  //   this.tasksListCreator();
  //   // await this.handlerAddEvents();
  // },
  // beforeDestroy() {
  //   // this.handlerRemoveEvents();
  // },
  // watch: {
  //   data(v) {
  //     if (v.length) {
  //       this.tasksListCreator();
  //       this.getMinMonth();
  //     }
  //   },
  // },
  // updated() {
  //   this.getMinMonth();
  // },
  // methods: {
  //   async handlerAddEvents() {
  //     await this.$nextTick();
  //
  //     document.addEventListener('scroll', this.handlerScroll);
  //     window.addEventListener('resize', this.handlerScroll);
  //   },
  //   handlerRemoveEvents() {
  //     document.removeEventListener('scroll', this.handlerScroll);
  //     window.removeEventListener('resize', this.handlerScroll);
  //   },
  //   handlerScroll() {
  //     const {y, height} = this.$refs.gantt?.getBoundingClientRect();
  //     const res = window.innerHeight - y;
  //     if (res > height) {
  //       return;
  //     }
  //     if (res === height) {
  //       return (this.getTaskWrapper.style.cssText = `height:${100}%`);
  //     } else {
  //       this.getTaskWrapper.style.cssText = `height:${res}px`;
  //     }
  //   },
  //
  //   handlerChangeTask(item) {
  //     this.$emit('on-change-item', item);
  //   },
  //
  //   handlerSelectEmit(selectedTask) {
  //     this.$emit('on-select', selectedTask);
  //   },
  //   getMinMonth() {
  //     const next = this.data.map((item) => item?.start);
  //     const minMonth = new Date(Math.min(...next)).getMonth();
  //     this.minMonth = this.config.months[minMonth];
  //   },
  //   handlerTaskSelectAll() {
  //     const allTaskId = this.flatTasks.map((item) => item.id);
  //     if (this.selectedTask.length === this.flatTasks.length) {
  //       this.selectedTask = [];
  //       this.handlerSelectEmit([]);
  //     } else {
  //       this.selectedTask = allTaskId;
  //       this.handlerSelectEmit(this.selectedTask);
  //     }
  //   },
  //   handlerTaskSelect(id) {
  //     const index = this.selectedTask.indexOf(id);
  //     if (index > -1) {
  //       this.selectedTask.splice(index, 1);
  //     } else {
  //       this.selectedTask.push(id);
  //     }
  //     this.handlerSelectEmit(this.selectedTask);
  //   },
  //   handlerTaskInfoClick(id) {
  //     this.$emit('on-click', id);
  //   },
  //
  //   handlerToggleTable() {
  //     this.$emit('on-show-table');
  //   },
  //
  //   taskToggleHandler(taskId) {
  //     let targetTask = null;
  //
  //     const newTasks = (arr, id) => {
  //       return arr.forEach((task) => {
  //         if (task.id !== id && task?.children?.length) {
  //           newTasks(task.children, id);
  //         } else {
  //           if (task.id === id) {
  //             targetTask = task;
  //           }
  //         }
  //       });
  //     };
  //
  //     newTasks(this.tasksList, taskId);
  //
  //     if (targetTask) {
  //       const target = {
  //         ...targetTask,
  //         showChild: (targetTask.showChild = !targetTask.showChild),
  //       };
  //
  //       const list = [...this.tasksList];
  //
  //       this.tasksList = [];
  //
  //       this.$nextTick(() => {
  //         this.tasksList = [...list];
  //       });
  //       return target;
  //     }
  //   },
  //
  //   tasksListCreator() {
  //     this.tasksList = this.data.map((item, index) => {
  //       const result = [];
  //       this.flatTasks.push(item);
  //       const taskStyle = this.taskStyle(item.start / 1000, item.end / 1000, index);
  //       const delayStyles = this.taskStyle(
  //           item.end / 1000,
  //           item.delay / 1000,
  //           index,
  //           true,
  //       );
  //       item.factStyles = this.taskStyle(
  //           item.start / 1000,
  //           item.executionDate / 1000,
  //           index,
  //       );
  //       item.factDelayStyles = this.taskStyle(
  //           item.end / 1000,
  //           item.executionDate / 1000,
  //           index,
  //       );
  //       if (item.factDelayStyles) item.style = taskStyle;
  //       item.delayStyles = {...delayStyles, left: parseInt(taskStyle.width) + 5 + 'px'};
  //
  //       item.showChild = !item?.children?.length;
  //       const getAllChildren = (task) => {
  //         task?.children?.length &&
  //         task.children.forEach((child, childIndex) => {
  //           child.showChild = true;
  //           this.flatTasks.push(task);
  //
  //           const childStyles = this.taskStyle(
  //               child.start / 1000,
  //               child.end / 1000,
  //               childIndex,
  //           );
  //
  //           const delayChildStyles = this.taskStyle(
  //               item.end / 1000,
  //               item.delay,
  //               childIndex,
  //           );
  //
  //           child.style = childStyles;
  //           child.delayStyles = {...delayChildStyles, left: childStyles.width};
  //
  //           if (child?.children?.length) {
  //             result.push(child);
  //
  //             getAllChildren(child, result);
  //           } else {
  //             result.push(child);
  //             return result;
  //           }
  //         });
  //       };
  //
  //       // getAllChildren(item);
  //
  //       return {
  //         ...item,
  //         // showChild: true,
  //         childList: result,
  //         taskLength: result.length + 1,
  //       };
  //     });
  //   },
  //
  //   taskStyle(taskStart, taskEnd, rowIndex, offset = false) {
  //     const widthMonth = 64;
  //
  //     const rowLength = widthMonth * this.columns;
  //
  //     const startDateGrid = this.getUnixTime[0]?.start;
  //     const endDateGrid = this.getUnixTime[this.getUnixTime.length - 1]?.end;
  //
  //     const timeColumn = (endDateGrid - startDateGrid) / this.columns;
  //
  //     let leftPositionLine = 0;
  //     if (taskStart > startDateGrid) {
  //       leftPositionLine =
  //           ((taskStart - startDateGrid) / (endDateGrid - startDateGrid)) * 100;
  //       leftPositionLine = (leftPositionLine * rowLength) / 100;
  //     }
  //
  //     // Линия финиша
  //     let rightPositionLine = leftPositionLine - 100 || 0;
  //     if (taskEnd <= endDateGrid) {
  //       rightPositionLine =
  //           ((taskEnd - startDateGrid) / (endDateGrid - startDateGrid)) * 100;
  //       rightPositionLine = (rightPositionLine * rowLength) / 100;
  //     }
  //
  //     const rowHeight = this.config.rowHeight;
  //
  //     const taskHeight = this.config.taskHeight;
  //
  //     const rowTaskPadding = this.config.rowTaskPadding;
  //
  //     const rows = this.data.length;
  //
  //     const task = this.tasksList[rowIndex - 1];
  //
  //     let taskLength = 1;
  //
  //     if (task) taskLength = task.taskLength;
  //
  //     const totalRowHeight =
  //         rowIndex === 0 ? rowHeight : taskHeight * taskLength + taskHeight;
  //
  //     const rowOffset =
  //         rowIndex === 0
  //             ? totalRowHeight * (rowIndex + 1) + rowTaskPadding
  //             : totalRowHeight * (rowIndex + 1) +
  //             rowTaskPadding +
  //             (rowHeight + taskHeight) * rowIndex;
  //     let width = rightPositionLine - leftPositionLine;
  //     if (taskStart === taskEnd || taskStart > taskEnd || width < 16) {
  //       width = 16;
  //     }
  //     if (offset) {
  //       width = width - 5;
  //     }
  //     return {
  //       left: `${leftPositionLine}px`,
  //       // width: `${width >= 0 ? width : 0}px`,
  //       width: `${width}px`,
  //
  //       rowOffset,
  //       rows,
  //       rowLength,
  //       timeColumn,
  //     };
  //   },
  //
  //   rowStyles(rowIndex) {
  //     const rowHeight = this.config.rowHeight;
  //
  //     const taskHeight = 64;
  //
  //     const task = this.tasksList[rowIndex - 1];
  //
  //     let taskLength = 1;
  //     if (task) taskLength = task.taskLength;
  //
  //     const allTaskList = [task, ...this.getAllChildTask(task)];
  //     const hiddenElements = [];
  //
  //     allTaskList.forEach((item) => {
  //       if (item && !item.showChild && item.children.length) {
  //         hiddenElements.push(...this.getAllChildTask(item));
  //       }
  //     });
  //
  //     const unique = [...new Set(hiddenElements)];
  //     const showElements = taskLength - unique.length;
  //     const totalRowHeight =
  //         rowIndex === 0 ? rowHeight + 48 : taskHeight * showElements - 4 * showElements;
  //
  //     return {
  //       height: `${totalRowHeight}px`,
  //       width: `${this.rowLength}px`
  //     };
  //   },
  //
  //   getAllChildTask(task) {
  //     const mainTask = {...task, children: []};
  //
  //     if (!task || !task?.children?.length) return [];
  //
  //     const getAllChildren = (task) => {
  //       task?.children?.length &&
  //       task.children.forEach((child) => {
  //         if (child && child.children && child.children.length) {
  //           mainTask.children.push(child);
  //           getAllChildren(child);
  //         } else {
  //           mainTask.children.push(child);
  //           return mainTask;
  //         }
  //       });
  //     };
  //     getAllChildren(task);
  //
  //     return mainTask.children;
  //   },
  // },
});
</script>

<style lang="scss" scoped>
/*//.fade-height-enter-active,
//.fade-height-leave-active {
//  transition: height 0.2s ease-in-out;
//}
//
//.fade-height-enter,
//.fade-height-leave-to {
//  transition: height 0.2s ease-in-out;
//}*/

.board {
  position: relative;

  .gantt_wrapper_mask {
    z-index: 10;
    position: absolute;
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;
    pointer-events: none;

    &-item {
      height: 100%;
      width: 1px;
      margin-right: 63px;
      border-right: 1px solid rgba(228, 237, 251, 0.8);
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 100%;
  }

  &__top {
    border: none;
    background-color: #e4edfb;
    height: 1px;
  }
}

.gantt_current_month {
  z-index: 100;

  display: flex;
  justify-content: center;

  border-radius: 4px;
  cursor: pointer;

  font-size: 10px;
  line-height: 12px;

  border-left: 1px dashed #3d75e4;
  height: 100%;
  margin-top: 1.8em;

  &__text {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 39px;
    height: 16px;

    padding: 2px 4px;

    background: #3d75e4;
    color: #ffffff;

    font-size: 0.7em;
    border-radius: 4px;
    transform: translateX(-50%);
  }
}

.gantt {
  display: flex;
  border-top: 1px solid #e4edfb;
  overflow-x: hidden;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 16px;
    height: 40px;

    background-color: rgba(#e4edfb, 0.8);
    color: #214eb0;
    outline: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    border: none;
    cursor: pointer;
  }

  &__board-type {
    position: relative;

    &-text {
      display: flex;
      align-items: center;
      color: #3d75e4;
      cursor: pointer;

      svg {
        margin-left: 8px;
      }
    }
  }

  &__select {
    position: absolute;
    left: -215px;
    z-index: 10000;
    width: 215px;
    padding: 24px 0;
    background: #ffffff;
    box-shadow: 0px 9px 28px rgba(17, 48, 121, 0.18);
    border-radius: 8px;

    &-item {
      position: relative;
      padding: 4px 20px;

      color: #04153e;
      opacity: 0.72;
      cursor: pointer;

      &:hover {
        &::before {
          content: "";
          position: absolute;
          background: #3d75e4;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
        }
      }

      &--active {
        &::before {
          content: "";
          position: absolute;
          background: #3d75e4;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
        }
      }

      &:not(&:last-child) {
        margin-bottom: 24px;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: auto;
  }
}

.gantt_task_wrapper {
  position: relative;
  overflow: hidden;
  //overflow-x: auto;
  //overflow-y: hidden;
}

.gantt_task_years {
  display: flex;
}

.gantt_task_item {
  position: absolute;

  width: 100%;
}

.gantt_task_cell {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  font-size: 13px;
  text-align: center;

  color: rgba(#091f52, 0.32);

  border-right: 1px solid rgba(#e4edfb, 0.8);
  border-bottom: 1px solid rgba(#e4edfb, 0.8);
}

.gantt_task_row {
  display: flex;
  width: auto;
  text-align: center;
  border-bottom: 1px solid rgba(#e4edfb, 0.8);
}

.task-list {
  &__row {
    height: 58px;
    line-height: 1;
    width: 400px;
    border-bottom: 1px solid rgba(#999, 0.3);
    padding-left: 1rem;
    display: flex;
    align-items: center;
    color: #222;
  }
}

.ROW {
  border-bottom: 1px solid rgba(#999, 0.1);
}

.gantt-area {
  position: relative;
}

/*//.gantt {
//  position: relative;
//
//  overflow-y: hidden;
//}*/

.mask {
  top: 2rem;

  width: 100%;
  height: 100%;
}

.mask__yLline {
  border-right: 1px solid rgba(102, 102, 102, 0.2);
}

.th_year,
.th_month {
  text-align: center;
}

.th_year {
  font-size: 1.2rem;
}

.th_month {
  border-bottom: 1px solid rgba(102, 102, 102, 0.2);
  line-height: 2.4rem;
  color: #777;
}

.currMonth-yLine {
  position: absolute;
  border-left: 1px dashed #ffa500;
  height: 100%;
  margin-top: 1.8em;
}

.currMonth-currDate {
  width: max-content;
  padding: 2px 4px;
  background: #ffa500;
  color: #fff;
  font-size: 0.7em;
  transform: translateX(-50%);
  border-radius: 4px;
  text-align: center;
}
</style>
