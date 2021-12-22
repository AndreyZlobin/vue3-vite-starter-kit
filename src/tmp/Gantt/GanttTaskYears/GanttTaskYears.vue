<template>
  <div class="gantt_task_years">
    <div v-for="year in mapOfYears" :key="year" class="gantt_task_year">
      <p>{{ year }}</p>
      <div class="gantt_task_months">
        <div v-for="(month, index) in months" :key="`${month}_${index}`" class="gantt_task_month">
          {{ month }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GANT_CONFIG } from "~/tmp/Gantt/gantt/ganttConfig";

export default defineComponent({
  props: {
    mapOfYears: { type: Array as PropType<number[]>, required: true },
  },
  setup() {
    return {
      months: GANT_CONFIG.months,
    };
  },
});
</script>

<style scoped lang="scss">
.gantt_task_years {
  //z-index: 100;
  //position: relative;
  //background: #fff;
}

.gantt_task_year {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 13px;
  border-bottom: 1px solid rgba(#e4edfb, 0.8);

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    height: 64px;
    font-size: 18px;
    border-bottom: 1px solid rgba(#e4edfb, 0.8);
    border-right: 1px solid rgba(228, 237, 251, 0.8);
  }
}

.gantt_task_months {
  display: flex;
}

.gantt_task_month {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  text-align: center;
  color: rgba(#091f52, 0.32);
  border-right: 1px solid rgba(228, 237, 251, 0.8);
}
</style>
