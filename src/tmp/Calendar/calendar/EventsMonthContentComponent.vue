<template>
  <section
    class="events"
    ref="events"
    :class="{
      openAllView: isViewAll,
    }"
  >
    <div
      v-for="l in listView"
      :key="l.id"
      class="events__event"
      :style="{
        backgroundColor: `var(--rir-${checkStartOrFinish(l).bg})`,
      }"
    >
      <!--      <rir-icon :icon="checkStartOrFinish(l).icon" fill="amelie" size="12" class="mr-2" />-->
    </div>
    <a class="events__large" v-if="isLargeList" @click="openAllList">
      {{ isViewAll ? 'Свернуть' : `Еще ${countLarge}` }}
    </a>
  </section>
</template>

<script>
// import RirIcon from '../../../components/RirIcon';
export default {
  name: 'events-month-content-component',
  // components: { RirIcon },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    day: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isViewAll: false,
    };
  },
  computed: {
    listView() {
      const list = [...this.getListDay];
      if (this.isLargeList && !this.isViewAll) {
        return list.splice(0, 2);
      }
      return list;
    },
    getListDay() {
      return this.list.filter((l) => {
        const dayStart = new Date(l.start).setHours(0, 0, 0, 0);
        const dayFinish = new Date(l.finish).setHours(0, 0, 0, 0);
        const isStart = dayStart === this.dayCell;
        const isFinish = l.finish && dayFinish === this.dayCell;
        return isStart || isFinish;
      });
    },
    dayCell() {
      return new Date(this.day).setHours(0, 0, 0, 0);
    },
    countListElement() {
      return this.getListDay.length;
    },
    isLargeList() {
      return this.countListElement > 3;
    },
    countLarge() {
      return this.countListElement - 2;
    },
  },
  methods: {
    openAllList() {
      this.isViewAll = !this.isViewAll;
      if (this.isViewAll) {
        this.$refs.events.style.minWidth = `${this.$refs.events.clientWidth}px`;
        this.$nextTick(() => {
          this.$refs.events.style.left = `calc(50% + ${
            (this.$refs.events.clientWidth / 2) * -1
          }px)`;
        });
      } else {
        this.$refs.events.style.minWidth = '100%';
      }
    },
    checkStartOrFinish(i) {
      const startDayItem = new Date(i.start).getDate() === new Date(this.day).getDate();
      return {
        icon: '',
        bg: '',
        // icon: startDayItem ? 'arrow-right' : 'arrow-left',
        // bg: startDayItem ? 'drive' : 'indiana',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  flex: 1 1 auto;
  background-color: var(--rir-amelie);
  padding: 4px;
  &.openAllView {
    position: absolute;
    z-index: 10;
    top: 36px;
    padding: 8px 0;
  }
  &__event {
    height: 28px;
    margin-top: 4px;
    width: 100%;
    overflow: hidden;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    padding: 8px 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    color: var(--rir-amelie);
  }
  &__large {
    font-size: 13px;
    line-height: 16px;
    color: var(--rir-rocky);
    justify-self: flex-end;
  }
}
</style>
