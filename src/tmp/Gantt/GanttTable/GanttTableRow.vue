<template>
  <div style="overflow: hidden">
    <div class="gantt_table__item">
      <div
        class="gantt_table__cell"
        v-for="(value, key, index) in getTableCellsFromHeader"
        :key="index"
      >
        <input
          class="gantt_table__item-control"
          :class="{ disabled: !item.edit }"
          type="text"
          :value="value"
          @blur="handlerBlur($event, key)"
        />
      </div>
    </div>
    <gantt-table-row v-for="(child, idx) in item.childs" :key="idx" :item="child" />
  </div>
</template>

<script>
import GanttTableRow from './GanttTable';

export default {
  name: 'GanttTableRow',

  components: { GanttTableRow },

  props: {
    item: { type: Object, required: true },
  },

  computed: {
    getTableCellsFromHeader() {
      const copyItem = JSON.parse(JSON.stringify(this.item));
      const allowed = ['dateStart', 'duration', 'dateEnd', 'executionDate', 'delay'];
      Object.keys(copyItem)
        .filter((key) => !allowed.includes(key))
        .forEach((key) => delete copyItem[key]);
      return copyItem;
    },
  },

  methods: {
    handlerBlur(event, key) {
      const { value } = event.target;
      const editedItem = { ...this.item, [key]: value };
      this.$eventHub.$emit('on-change-input', editedItem);
    },
  },
};
</script>

<style scoped lang="scss">
.gantt_table {
  display: block;
  width: 380px;
  overflow-x: auto;
  white-space: nowrap;
  border-right: 1px solid #e4edfb;

  &__header {
    height: 167px;

    background: #f6f9fe;
    border-bottom: 1px solid #e4edfb;
    width: auto;

    &-item {
      font-size: 13px;
      color: #04153e;
      opacity: 0.48;
      vertical-align: bottom;
      padding: 16px 34px;
      white-space: nowrap;

      &-text {
        margin-right: 24px;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    margin: 0;
    padding-right: 24px;
    min-height: 59px;
    border-bottom: 1px solid #e4edfb;

    input {
      text-align: center;
    }

    &-control {
      width: 120px;
      cursor: pointer;
      border: none;
      outline: none;
      transition: all 0.3s linear;

      &:hover {
        color: #04153e;
        background: rgba(#3d75e4, 0.08);
        border-radius: 4px;
      }
    }
  }
}

.gantt_table__cell {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  min-height: 59px;
}
</style>
