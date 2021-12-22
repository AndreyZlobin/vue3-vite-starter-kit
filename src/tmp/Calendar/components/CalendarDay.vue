<template>
  <section class="rir-calendar-day">
    <slot name="day" :day="date" />
  </section>
</template>

<script>
export default {
  name: 'rir-calendar-week',
  props: {
    date: {
      type: String,
    },
  },
};
</script>
