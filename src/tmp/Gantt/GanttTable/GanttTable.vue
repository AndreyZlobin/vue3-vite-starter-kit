<template>
  <div class="gantt_table">
    <div class="gantt_table__header">
      <div
        v-for="(headerItem, index) in Object.values(tableData.headers)"
        :key="index"
        class="gantt_table__header-item"
      >
        {{ headerItem.title }}
      </div>
    </div>

    <gantt-table-row
      v-for="(item, index) in tableData.items"
      :key="index"
      :item="item"
      :style="rowStyles(index + 1)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GanttTableRow from './GanttTableRow.vue';

export default {
  props: {
    rowStyles: { type: Function, required: true },
    tableData: { type: Object, default: () => ({}), required: true },
  },

  components: {
    GanttTableRow,
  },

  data() {
    return {
      item: null,
    };
  },
  computed: {
    ...mapGetters({
      viewColumns: 'getViewColumns',
    }),
    items() {
      const cloneItems = JSON.parse(JSON.stringify(this.tableData.items));
      return cloneItems.map((item) => {
        const el = item;
        delete el.id;
        return el;
      });
    },
    filteredHeaders() {
      let obj = {};

      for (const [key, value] of Object.entries(this.tableData.headers)) {
        if (this.viewColumns[key]) obj[key] = value;
      }
      return obj;
    },
  },
  methods: {
    idBool(variable) {
      return typeof variable === 'boolean';
    },
    showTableCell(headers, field) {
      return Object.keys(headers).includes(field);
    },
    setItem(item) {
      this.item = item;
    },
    handlerInput(event, key) {
      const { value } = event.target;
      this.item[key] = value;
    },
    handlerBlur() {
      this.$emit('on-change', this.item);
      this.item = null;
    },
  },
};
</script>

<style scoped lang="scss">
.gantt_table {
  width: 600px;
  overflow-x: auto;
  border-right: 1px solid #e4edfb;

  &__header {
    display: flex;
    align-items: center;
    height: 168px;
    background-color: #f6f9fe;
    border-bottom: 1px solid #e4edfb;

    &-item {
      width: 120px;
      font-size: 13px;
      color: #04153e;
      opacity: 0.48;
      overflow: hidden;
      text-align: center;
      white-space: pre-line;
      overflow: hidden;
      text-overflow: ellipsis;

      &-text {
        margin-right: 24px;
      }
    }
  }

  &__item {
    padding: 16px 34px;
    margin-right: 24px;

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
</style>
