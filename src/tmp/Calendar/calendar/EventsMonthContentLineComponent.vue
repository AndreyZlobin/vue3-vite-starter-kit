<template>
  <section class="events" ref="events">
    <div
      v-for="l in listView"
      :key="l.id"
      class="events__event"
      :style="{
        // backgroundColor: `var(--rir-${checkStartOrFinish(l).bg})`,
        // color: `var(--rir-${checkStartOrFinish(l).color})`,
      }"
    >
      <p
        :style="{
          // color: `var(--rir-${checkStartOrFinish(l).color})`,
        }"
      >
<!--        <rir-icon-->
<!--          :fill="`${checkStartOrFinish(l).color}`"-->
<!--          :icon="`${checkStartOrFinish(l).icon}`"-->
<!--          size="16"-->
<!--          class="mr-2"-->
<!--        />-->
        {{ l.title }}
      </p>
    </div>

    <div v-if="moreTaskLength >= 1" @click="openAllList" class="events__show-more">
      <span>{{ showMoreText }}</span>
      <span v-if="!isViewAll">{{ moreTaskLength }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'events-month-content-line-component',
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
      const visibleItems = list.length === 3 ? list : list.splice(0, 2);
      return this.isViewAll ? this.getListDay : visibleItems;
    },
    moreTaskLength() {
      const totalVisibleElements = 2;
      const list = this.getListDay;
      return list.length === 3 ? false : this.getListDay.length - totalVisibleElements;
    },
    showMoreText() {
      return this.isViewAll ? 'Скрыть' : 'Еще';
    },
    getListDay() {
      return this.list.filter((l) => {
        const dayStart = new Date(l.start).setHours(0, 0, 0, 0);
        const dayFinish = new Date(l.finish).setHours(0, 0, 0, 0);
        return dayStart <= this.dayCell && dayFinish >= this.dayCell;
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
          this.$refs.events.style.height = `100%`;
        });
      } else {
        this.$refs.events.style.minWidth = '100%';
      }
    },
    checkStartOrFinish(i) {
      if (i.object.type === 'task') {
        return {
          icon: isDelay ? 'in-progress' : isFact ? 'selected' : 'arrow-right',
          bg: isDelay ? 'romance' : isFact ? 'amadeus' : 'departed',
          color: isDelay ? 'fargo ' : isFact ? 'matrix' : 'gentlemen',
        };
      } else {
        return {
          icon: isDelay ? 'in-progress' : isFact ? 'selected' : 'arrow-left',
          bg: isDelay ? 'indiana' : isFact ? 'drive' : 'alien',
          color: 'rush',
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  flex: 1 1 auto;
  background-color: var(--rir-amelie);
  padding: 4px;
  overflow-y: auto;

  &__event {
    height: 28px;
    padding: 8px;
    width: 100%;
    overflow: hidden;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: var(--rir-amelie);
    background: #efe8fc;
    border-radius: 4px;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  &__show-more {
    cursor: pointer;

    & > * {
      color: var(--rir-rocky);
    }
  }
}
</style>
