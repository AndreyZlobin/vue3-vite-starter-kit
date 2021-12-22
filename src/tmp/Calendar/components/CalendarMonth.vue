<template>
  <section class="rir-calendar-month">
    <div id="weekdays">
      <div v-for="(wd, index) in weekDays" :key="`wd-${index}`">
        {{ wd }}
      </div>
    </div>
    <div class="rir-calendar-month__calendar">
      <div
        v-for="d in paddingStartDays"
        :key="`day-prev-${d}`"
        class="rir-calendar-month__day day-prev-month"
      >
        <div class="rir-calendar-month__title">
          <span>{{ daysInPrevMonth - (paddingStartDays - d) }}</span>
        </div>
      </div>
      <div
        v-for="d in daysInMonth"
        :key="`day-${d}`"
        class="rir-calendar-month__day day-now-month"
      >
        <div class="rir-calendar-month__title">
          <span
            :class="{
              now: isNow(d),
            }"
            >{{ d }}</span
          >
        </div>
        <slot name="month" :day="getDayCell(d)" />
      </div>
      <div
        v-for="d in paddingFinishDays"
        :key="`day-next-${d}`"
        class="rir-calendar-month__day day-next-month"
      >
        <div class="rir-calendar-month__title">
          <span>{{ d }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { MONTH_DAY_LEAP, MONTH_DAY, WEEK_DAYS } from '../plugins/enum';
import { isLeapYear, paddingFirstDayInMonth, getMonth, getYear } from '../plugins/utils';

export default {
  name: 'rir-calendar-month',
  data() {
    return {
      weekDays: WEEK_DAYS,
    };
  },
  props: {
    date: {
      type: String,
    },
  },
  computed: {
    daysInMonth() {
      return this.daysList[getMonth(this.date)];
    },
    daysInPrevMonth() {
      return this.daysList[getMonth(this.date) === 0 ? 11 : getMonth(this.date) - 1];
    },
    daysList() {
      const isLeap = isLeapYear(getYear(this.date));
      return isLeap ? MONTH_DAY_LEAP : MONTH_DAY;
    },
    paddingStartDays() {
      return paddingFirstDayInMonth(getYear(this.date), getMonth(this.date));
    },
    paddingFinishDays() {
      return 42 - (this.paddingStartDays + this.daysInMonth);
    },
    countGrid() {
      return this.paddingStartDays + this.daysInMonth + this.paddingFinishDays;
    },
  },
  methods: {
    isNow(d) {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      return day === d && month === getMonth(this.date) && year === getYear(this.date);
    },
    getDayCell(d) {
      return new Date(new Date(this.date).setDate(d)).toUTCString();
    },
  },
};
</script>
