<template>
  <section class="rir-calendar-week">
    <div v-for="d in weekArr" :key="dateNumber(d.date)" class="rir-calendar-week__day">
      <span :style="currentDay(d.date)">{{ d.title }}, {{ dateNumber(d.date) }}</span>
      <div class="rir-calendar-week__content">
        <slot name="week" :day="d.date" />
      </div>
    </div>
  </section>
</template>

<script>
// @TODO фильтровать список на даты за неделю, месяц и год от props [date]
import { getDate, getWeekArray } from '../plugins/utils';

export default {
  name: 'rir-calendar-week',
  props: {
    date: {
      type: String,
    },
  },
  computed: {
    weekArr() {
      return getWeekArray(this.date);
    },
  },
  methods: {
    currentDay(date) {
      const d = new Date(date).toLocaleDateString();
      const today = new Date().toLocaleDateString();
      return d === today ? { opacity: `1` } : '';
    },
    dateNumber(d) {
      return getDate(d);
    },
  },
};
</script>
