<template>
  <transition appear @before-appear="onCreate" @appear="onData">
    <div class="w-full relative">
      <div v-if="showTools" class="tools">
        <div class="search">
          <input type="text" :value="query" placehorder="search..." @input="updateQuery" />
          <button class="clear" @click="clearQuery">clear</button>
        </div>
      </div>
      <div class="table w-full mb-5 cursor-pointer relative transition-all duration-200">
        <div
          class="table-header-group bg-blue-400 text-center"
          :class="{ 'opacity-50': loading || !filteredItems.length }"
          @click="sortTableData"
        >
          <div class="table-row">
            <span
              v-for="(col, key) in columns"
              :key="`${col.title}_${key}`"
              :style="{ width: `${col?.width}px` }"
              :data-key="col.dataId"
              :data-sorted="col.sorted"
              :data-deep="col.deep"
              class="table-cell py-2 px-1 text-left last:rounded-tr-xl first:rounded-tl-xl"
            >
              <span class="pointer-events-none p-3 text-white-400" :class="{ 'mr-1': col.sorted }">
                {{ col.title }}</span
              >
              <carbon-sort-ascending
                v-if="col.sorted"
                class="inline-flex pointer-events-none text-white-400"
              />
              <span v-if="prevKey === key" :class="['arrow', orderDesc ? 'desc' : 'asc']"> </span>
            </span>
          </div>
        </div>
        <div v-if="loading" class="opacity-100 h-25" :class="`h-${11 * itemsOnPage}`">
          <v-loader class="mt-5 w-full absolute left-1/2" />
        </div>
        <div v-if="!filteredItems.length && !loading" class="opacity-100 h-55">
          <v-no-data :text="noDataText" class="absolute mt-5" />
        </div>
        <transition-group v-if="!loading" name="items" tag="div" class="table-header-group">
          <div
            v-for="(row, index) in filteredItems"
            :key="row.id"
            class="table-row hover:bg-blue-100 pointer"
            :class="index % 2 === 1 && isOdd && 'bg-blue-50'"
          >
            <span
              v-for="column in columns"
              :key="column.dataId"
              class="table-cell text-left border-b-1 p-3"
              @click="handlerRowClick(row)"
            >
              <span
                >{{ getColName(column.dataId, row, column.deep, column.empty, column.format) }}
              </span>
              <slot v-if="column.customSlot" :name="column.customSlot" :item="row"></slot>
            </span>
          </div>
        </transition-group>
      </div>
      <v-pagination
        v-if="!loading && items.length && pagination"
        :total="totalPages"
        :page="currentPage"
        @change="handlerChangePage"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import _ from "lodash";
import VLoader from "~/components/ui/v-loader/index.vue";
import { defineComponent, PropType } from "vue";
import VNoData from "~/components/ui/v-no-data/index.vue";
import { debounce } from "~/utils/debounce";
import { TableColumns } from "~/types";
import VPagination from "~/components/ui/v-pagination/index.vue";

type ItemKayMap = { [key: string]: string };
const isTrueSet = (value: string | null | undefined): boolean => value === "true";
export default defineComponent({
  name: "VTable",
  components: { VPagination, VNoData, VLoader },
  props: {
    loading: { type: Boolean as PropType<boolean>, default: false, required: false },
    showTools: { type: Boolean as PropType<boolean>, default: false, required: false },
    isOdd: { type: Boolean as PropType<boolean>, default: true, required: false },
    noDataText: { type: String as PropType<string>, default: "Данных нет", required: false },
    items: { type: Array as PropType<ItemKayMap[]>, default: () => [], required: true },
    columns: { type: Array as PropType<TableColumns[]>, default: () => [], required: true },
    pagination: { type: Boolean as PropType<boolean>, default: true, required: false },
    totalItems: { type: Number as PropType<number>, default: 0, required: false },
    currentPage: { type: Number as PropType<number>, default: 0, required: false },
    itemsOnPage: { type: Number as PropType<number>, default: 10, required: false },
  },
  emits: {
    "row-click"(value: ItemKayMap) {
      return !!Object.keys(value).length;
    },
    "change-page"(page: number): boolean {
      return typeof page === "number";
    },
  },
  data() {
    return {
      tableData: [],
      query: "",
      prevKey: "id",
      orderDesc: false,
    };
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
    filteredItems() {
      const searchValueReplaced = this.query.replaceAll(" ", "").toLowerCase();
      return _.filter(this.tableData, (user) =>
        _.find(user, (prop) => {
          return new RegExp(searchValueReplaced, "i").test(prop);
        }),
      );
    },
  },
  watch: {
    items(value) {
      if (value) {
        this.tableData = value;
      }
    },
  },
  methods: {
    handlerChangePage(page: number): void {
      this.$emit("change-page", page);
    },
    getColName(
      dataId: string,
      col: any,
      deep: string[] | string[][],
      empty: string | number,
      format: (value: string | number) => string | number,
    ): string | number {
      const emptyId = empty ?? "-";
      let field = col[dataId];
      let deepField = "";
      if (typeof field !== "object") {
        return field;
      }
      deep &&
        deep.forEach((el) => {
          if (el instanceof Array) {
            let beepFieldEl = field;
            el.forEach((el) => {
              beepFieldEl = beepFieldEl?.[el] || beepFieldEl;
            });
            if (typeof beepFieldEl === "string") {
              deepField += ` ${beepFieldEl}` || "";
            }
          } else {
            deepField += `${field?.[el] || emptyId} `;
          }
        });
      const res = deepField ? deepField?.trim() : deepField;
      return format ? format(res) : res;
    },
    handlerRowClick(row: ItemKayMap): void {
      this.$emit("row-click", row);
    },
    sortTableData(evt: MouseEvent): void {
      if (!this.filteredItems.length) return;
      let { key, sorted, deep } = (evt.target as HTMLElement).dataset;
      let deepKey = deep && deep.includes(",") ? deep.split(",")[0] : deep || "";

      const ifSorted = isTrueSet(sorted);
      if (!ifSorted) return;

      if (this.prevKey === key) {
        this.tableData.reverse();
        this.orderDesc = !this.orderDesc;
      } else {
        this.tableData = _.sortBy(this.tableData, (el) => {
          return key ? el[key]?.[deepKey] : key && el[key] ? el[key] : el;
        });
        this.orderDesc = false;
        this.prevKey = key;
      }
    },
    updateQuery: debounce(function (evt: InputEvent): void {
      this.query = (evt.target as HTMLInputElement).value;
    }, 300),

    clearQuery() {
      this.query = "";
    },
    onCreate(elm: HTMLDivElement) {
      elm.style.opacity = "0";
    },
    onData(elm: HTMLDivElement) {
      this.tableData = this.items;
      elm.style.opacity = "1";
    },
  },
});
</script>

<style scoped>
.data-grid {
  margin: 10px auto;
  padding: 2px;
  background-color: white;
  overflow: hidden;
}

.arrow {
  display: inline-block;
  position: absolute;
  width: 0;
  height: 0;
  margin-left: 5px;
  margin-top: 5px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transition: all 0.6s;
}

.asc {
  border-bottom: 6px solid white;
}

.desc {
  border-top: 6px solid white;
}

.items-move {
  transition: transform 0.6s;
}

.items-enter-active,
.items-leave-active {
  transition: all 0.6s;
}

.items-enter,
.items-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
