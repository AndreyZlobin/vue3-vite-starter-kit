<template>
  <div class="p-5 border-1 rounded">
    <svg width="900" height="150" class="js-calendar-graph-svg">
      <g transform="translate(10, 20)">
        <g v-for="(item, index) in 52" :key="index" :transform="`translate(${16 * index}, 0)`">
          <rect
            v-for="(cell, idx) in 7"
            :key="idx"
            width="13"
            height="13"
            x="16"
            class="ContributionCalendar-day"
            rx="4"
            ry="4"
            data-count="0"
            :y="idx * 15"
            :data-date="getTomorrow(cell * item).toLocaleDateString()"
            :data-level="Math.floor(Math.random() * 4)"
          ></rect>
        </g>
      </g>

      <text
        v-for="(month, index) in months"
        :x="31 + index * 60"
        y="10"
        class="ContributionCalendar-label"
      >
        {{ month }}
      </text>

      <text
        v-for="(day, index) in shortWeekDays"
        :key="day"
        text-anchor="start"
        class="ContributionCalendar-label"
        dx="5"
        :dy="30 + 15 * index"
      >
        {{ day }}
      </text>
    </svg>
    <div class="width-full f6 px-0 px-md-5 py-1">
      <div
        class="flex items-center color-text-secondary"
        title="A summary of pull requests, issues opened, and commits to the default and gh-pages branches."
      >
        <span class="mr-2"> Меньше</span>
        <svg width="10" height="10" class="d-inline-block mr-1">
          <rect
            width="10"
            height="10"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            data-level="0"
          ></rect>
        </svg>
        <svg width="10" height="10" class="d-inline-block mr-1">
          <rect
            width="10"
            height="10"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            data-level="1"
          ></rect>
        </svg>
        <svg width="10" height="10" class="d-inline-block mr-1">
          <rect
            width="10"
            height="10"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            data-level="2"
          ></rect>
        </svg>
        <svg width="10" height="10" class="d-inline-block mr-1">
          <rect
            width="10"
            height="10"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            data-level="3"
          ></rect>
        </svg>
        <svg width="10" height="10" class="d-inline-block">
          <rect
            width="10"
            height="10"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            data-level="4"
          ></rect>
        </svg>
        <span class="ml-3">Больше</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { months, SHORT_WEEK_DAYS } from "~/shared/constants";

export default defineComponent({
  name: "UserActivity",
  setup() {
    const currentYear = 2021;
    const shortWeekDays = SHORT_WEEK_DAYS;

    function getTomorrow(offset: number) {
      const currentDate = new Date(currentYear, 0, 0);
      return new Date(currentDate.setDate(currentDate.getDate() + offset));
    }

    // console.log(getTomorrow(365));

    return {
      months,
      currentYear,
      shortWeekDays,
      getTomorrow,
    };
  },
});
</script>

<style scoped lang="scss">
.ContributionCalendar-day,
.ContributionCalendar-day[data-level="0"] {
  fill: #ebedf0;
  shape-rendering: geometricPrecision;
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
}

.ContributionCalendar-day[data-level="2"] {
  fill: #40c463;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-day[data-level="4"] {
  fill: #216e39;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-day[data-level="3"] {
  fill: #30a14e;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-label {
  fill: #24292f;
  font-size: 12px;
}

.ContributionCalendar-day[data-level="1"] {
  fill: #9be9a8;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}
</style>
