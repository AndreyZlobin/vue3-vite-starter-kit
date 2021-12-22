<template>
  <div class="paginator">
    <div class="paginator__items">
      <div class="paginator__item--start paginator__prev" @click="prev">&lt;</div>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="paginator__item"
        :class="{
          paginator__separator: item === '...',
          'paginator__item--start': items[index - 1] === '...',
          'paginator__item--end': items[index + 1] === '...',
          'paginator__item--active': item === current,
        }"
        @click="itemClick(item)"
      >
        <span>{{ item }}</span>
      </div>
      <div class="paginator__item--end paginator__next" @click="next">&gt;</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

// export default defineComponent({
export default defineComponent({
  name: "VPagination",
  model: {
    prop: "page",
    event: "change",
  },
  props: {
    page: { type: Number as PropType<number>, default: 1 },
    total: { type: Number as PropType<number>, required: true },
  },
  data() {
    return {
      current: this.page || 1,
    };
  },
  computed: {
    items(): (number | string | boolean)[] {
      let items = [];

      if (this.total <= 12) {
        for (let i = 1; this.total >= i; i++) {
          items.push(i);
        }
      } else if (this.current < 4) {
        items = [1, 2, 3, 4, "...", this.total];
      } else if (this.current < this.total - 2) {
        items = [
          1,
          this.current - 3 >= 2 ? "..." : false,
          this.current - 2,
          this.current - 1,
          this.current,
          this.current + 1,
          this.current + 2,
          this.current + 3 <= this.total - 1 ? "..." : false,
          this.total,
        ];
      } else {
        items = [1, "...", this.total - 3, this.total - 2, this.total - 1, this.total];
      }

      return items.filter((item) => !!item);
    },
  },
  watch: {
    current(value) {
      if (value !== this.page) {
        value === 1 ? this.$emit("change", 0) : this.$emit("change", value);
      }
    },
    page(value) {
      if (value !== this.current) this.current = value;
    },
  },
  methods: {
    prev(): void {
      if (this.current > 1) {
        this.current--;
      }
    },
    next(): void {
      if (this.current < this.total) {
        this.current++;
      }
    },
    itemClick(item: string | number): void {
      if (typeof item === "number") {
        this.current = item;
      }
    },
  },
});
</script>

<style lang="scss">
.paginator {
  display: inline-flex;

  &__items {
    display: inline-flex;
    border-radius: 20px;
    margin: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__item {
    $this: &;

    position: relative;
    display: inline-flex;
    align-items: center;
    height: 40px;
    padding: 10px 16px;
    color: #04153e;
    font-weight: 500;
    cursor: pointer;
    background: #e6ebf5;

    &:before {
      content: "";
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #3d75e4;
      border-radius: 20px;
    }

    span {
      display: block;
      position: relative;
    }

    &--active {
      @extend #{$this};
      &,
      * {
        color: #fff;
      }
    }

    &--active:before {
      display: block;
    }

    &--start {
      @extend #{$this};
      border-radius: 20px 0 0 20px;
    }

    &--end {
      @extend #{$this};
      border-radius: 0 20px 20px 0;
    }
  }

  &__separator {
    border-radius: 20px;
    margin: 0 8px;
    cursor: default;
  }
}
</style>
