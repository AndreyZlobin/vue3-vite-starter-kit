<template>
  <section class="events">
    <div
      class="events__event"
      :class="[listDay]"
      :style="{
        height: `${sizeCircle}px`,
        width: `${sizeCircle}px`,
      }"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'events-year-content-component',
  props: {
    type: {
      type: String,
      default: 'year',
    },
    list: {
      type: Array,
      default: () => [],
    },
    day: {
      type: String,
      default: '',
    },
  },
  computed: {
    sizeCircle() {
      switch (this.type) {
        case 'year':
          return 8;
        default:
          return 16;
      }
    },
    listDay() {
      let start = false;
      let finish = false;
      this.list.forEach((el) => {
        const dayStart = new Date(el.start).setHours(0, 0, 0, 0);
        const dayFinish = new Date(el.finish).setHours(0, 0, 0, 0);
        if (dayStart === this.dayColumn || dayFinish === this.dayColumn) {
          start = start || dayStart === this.dayColumn;
          finish = finish || dayFinish === this.dayColumn;
        }
      });
      return start && finish ? 'two' : start ? 'start' : finish ? 'finish' : '';
    },
    dayColumn() {
      return new Date(this.day).setHours(0, 0, 0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  display: flex;
  align-items: center;
  justify-content: center;

  &__event {
    border-radius: 50%;

    &.start {
      background: linear-gradient(
        -90deg,
        #8dc95e,
        #8dc95e 49%,
        white 49%,
        white 51%,
        #8dc95e 51%
      );
    }

    &.finish {
      background: linear-gradient(
        -90deg,
        #ff9eae,
        #ff9eae 49%,
        white 49%,
        white 51%,
        #ff9eae 51%
      );
    }

    &.two {
      background: linear-gradient(
        90deg,
        #8dc95e,
        #8dc95e 49%,
        white 49%,
        white 51%,
        #ff9eae 51%
      );
    }
  }
}
</style>
