<template>
  <section class="rir-calendar-quarter">
    <block-calendar
      v-for="q in quarter"
      :key="q.month"
      class="quarter"
      :q="q"
      :date="date"
    >
      <template slot="year" slot-scope="{ day }">
        <slot name="year" :day="day" />
      </template>
    </block-calendar>
  </section>
</template>

<script>
import BlockCalendar from '../layouts/BlockCalendar.vue';
import { QUARTER_MONTH } from '../plugins/enum';
export default {
  name: 'rir-calendar-quarter',
  components: { BlockCalendar },
  props: {
    date: {
      type: String,
    },
  },
  computed: {
    quarter() {
      const d = new Date(this.date); // If no date supplied, use today
      return QUARTER_MONTH[Math.floor((d.getMonth() + 3) / 3)];
    },
  },
};
</script>
