<template>
  <section class="rir-calendar-quarter">
    <block-calendar v-for="q in quarter" :key="q.month" class="year" :q="q" :date="date">
      <template slot="year" v-slot:year="{ day }">
        <slot name="year" :day="day" />
      </template>
    </block-calendar>
  </section>
</template>

<script>
import BlockCalendar from '../layouts/BlockCalendar.vue';
import { QUARTER_MONTH } from '../plugins/enum';
export default {
  name: 'rir-calendar-year',
  components: { BlockCalendar },
  props: {
    date: {
      type: String,
    },
  },
  computed: {
    quarter() {
      let list = [];
      for (const quartermonthKey in QUARTER_MONTH) {
        list = list.concat(QUARTER_MONTH[quartermonthKey]);
      }
      return list;
    },
  },
};
</script>
