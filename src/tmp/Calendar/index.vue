<template>
  <section class="rir-calendar">
    <component :is="componentsData.component" v-bind="componentsData.props">
      <!--        <template v-if="isSlots('day')" slot="day" slot-scope="{ day }">-->
      <!--          <slot name="day" :day="day"/>-->
      <!--        </template>-->
      <!--        <template v-if="isSlots('week')" slot="week" slot-scope="{ day }">-->
      <!--          <slot name="week" :day="day"/>-->
      <!--        </template>-->
      <!--        <template slot="month" v-if="isSlots('month')" v-slot:month="{ day }">-->
      <!--          <slot name="month" :day="day"/>-->
      <!--        </template>-->

      <!--        <template v-if="isSlots('quarter')" slot="quarter" slot-scope="{ day }">-->
      <!--          <slot name="quarter" :day="day"/>-->
      <!--        </template>-->
      <template slot="year" v-slot:year="{ day }">
        <slot name="year" :day="day"/>
      </template>
    </component>
  </section>

</template>

<script>
import CalendarMonth from './components/CalendarMonth.vue';
import CalendarWeek from './components/CalendarWeek.vue';
import CalendarDay from './components/CalendarDay.vue';
import CalendarQuarter from './components/CalendarQuarter.vue';
import CalendarYear from './components/CalendarYear.vue';
export default {
  name: 'rir-calendar',
  components: {},
  props: {
    type: {
      type: String,
      default: 'month',
    },
    date: {
      type: String,
    },
  },
  computed: {
    isSlots() {
      return (slot) => !!this.$scopedSlots[slot];
    },
    propsComponent() {
      return {
        date: this.date,
      };
    },
    componentsData() {
      const props = this.propsComponent;
      let component = null;
      switch (this.type) {
        case 'day':
          component = CalendarDay;
          break;
        case 'week':
          component = CalendarWeek;
          break;
        case 'quarter':
          component = CalendarQuarter;
          break;
        case 'year':
          component = CalendarYear;
          break;
          // default = month
        default:
          component = CalendarMonth;
          break;
      }
      return {
        component,
        props,
      };
    },
  },
};
</script>
<style lang="scss">
@import 'rirCalendar';
</style>
