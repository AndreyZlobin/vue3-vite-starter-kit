<template>
  <section class="events">
    <div v-for="l in listDay" :key="l.id" class="events__event">
      <!--      <event-day-item :day-item="l" />-->
      <log>{{ l }}</log>
    </div>
  </section>
</template>

<script>
// import EventDayItem from './EventDayItem';

export default {
  name: 'events-day-content-component',
  // components: {EventDayItem},
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
  computed: {
    listDay() {
      return this.list.filter((el) => {
        const dayStart = new Date(el.dates.dateStart).setHours(0, 0, 0, 0);
        const dayFinish = new Date(el.dates.dateEnd).setHours(0, 0, 0, 0);
        return dayStart === this.dayColumn || dayFinish === this.dayColumn;
      });
    },
    dayColumn() {
      return new Date(this.day).setHours(0, 0, 0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  height: 100%;
  overflow-y: auto;

  &__event {
    margin-top: 16px;
    width: 100%;
    overflow: hidden;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    padding: 8px 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    //color: var(--rir-amelie);
  }

  &__large {
    font-size: 13px;
    line-height: 16px;
    //color: var(--rir-rocky);
    justify-self: flex-end;
  }
}
</style>
