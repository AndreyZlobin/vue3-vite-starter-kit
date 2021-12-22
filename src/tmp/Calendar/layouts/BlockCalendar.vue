<template>
  <section class="block-calendar">
    <div class="block-calendar__month">{{ q.title }}</div>
    <div class="block-calendar__weeks">
      <span v-for="(wd, index) in weekDays" :key="`wd-${index}`">
        {{ wd }}
      </span>
    </div>
    <div class="block-calendar__calendar">
      <div
        v-for="d in paddingStartDays"
        :key="`day-prev-${d}`"
        class="block-calendar__day day-prev-month"
      >
        <div class="block-calendar__day-num">
          <span>{{ daysInPrevMonth - (paddingStartDays - d) }}</span>
        </div>
      </div>
      <div
        v-for="d in daysInMonth"
        :key="`day-${d}`"
        class="block-calendar__day day-now-month"
      >
        <div class="block-calendar__day-num">
          <span
            :class="{
              now: isNow(d),
            }"
            >{{ d }}</span
          >
        </div>
        <slot name="year" :day="getDayCell(d)" />
      </div>
      <div
        v-for="d in paddingFinishDays"
        :key="`day-next-${d}`"
        class="block-calendar__day day-next-month"
      >
        <div class="block-calendar__day-num">
          <span>{{ d }}</span>
        </div>
      </div>
    </div>
    <!--    <slot name="year" :q="q" />-->
  </section>
</template>

<script>
import { MONTH_DAY, MONTH_DAY_LEAP, WEEK_DAYS_SHORT } from '../plugins/enum';
import { getMonth, getYear, isLeapYear, paddingFirstDayInMonth } from '../plugins/utils';

export default {
  name: 'block-calendar',
  data() {
    return {
      weekDays: WEEK_DAYS_SHORT,
    };
  },
  props: {
    date: {
      type: String,
    },
    q: {
      type: Object,
    },
  },
  computed: {
    daysInMonth() {
      return this.daysList[this.q.month];
    },
    daysInPrevMonth() {
      return this.daysList[this.q.month === 0 ? 11 : this.q.month - 1];
    },
    daysList() {
      const isLeap = isLeapYear(getYear(this.date));
      return isLeap ? MONTH_DAY_LEAP : MONTH_DAY;
    },
    paddingStartDays() {
      return paddingFirstDayInMonth(getYear(this.date), this.q.month);
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
      const date = new Date(new Date(this.date).setMonth(this.q.month));
      return new Date(date.setDate(d)).toUTCString();
    },
  },
};
</script>
