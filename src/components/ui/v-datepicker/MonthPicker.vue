<template>
  <picker-popup
    heading-clickable
    :column-count="3"
    :items="months"
    :left-disabled="leftDisabled"
    :right-disabled="rightDisabled"
    @left="previousPage"
    @right="nextPage"
    @heading="$emit('back')"
    @elementClick="$emit('select', $event)"
  >
    <template #heading>{{ heading }}</template>
  </picker-popup>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getYear,
  subYears,
  addYears,
  isSameMonth,
  isBefore,
  isAfter,
  isSameYear,
  startOfMonth,
  endOfMonth,
  isValid,
} from "date-fns";
import PickerPopup from "./PickerPopup.vue";
import { formatWithOptions } from "date-fns/fp";

export default defineComponent({
  components: {
    PickerPopup,
  },
  emits: {
    "update:pageDate": (date: Date) => isValid(date),
    select: (date: Date) => isValid(date),
    back: () => true,
  },
  props: {
    selected: { type: Date as PropType<Date>, required: false },
    pageDate: { type: Date as PropType<Date>, required: true },
    format: { type: String, required: false, default: "LLL" },
    locale: { type: Object as PropType<Locale>, required: false },
    lowerLimit: { type: Date as PropType<Date>, required: false },
    upperLimit: { type: Date as PropType<Date>, required: false },
  },
  setup(props, { emit }) {
    const from = computed(() => startOfYear(props.pageDate));
    const to = computed(() => endOfYear(props.pageDate));

    const format = computed(() =>
      formatWithOptions({
        locale: props.locale,
      })(props.format),
    );

    const isEnabled = (target: Date, lower: Date | undefined, upper: Date | undefined): boolean => {
      if (!lower && !upper) return true;
      if (lower && isBefore(target, startOfMonth(lower))) return false;
      if (upper && isAfter(target, endOfMonth(upper))) return false;
      return true;
    };

    const months = computed(() =>
      eachMonthOfInterval({
        start: from.value,
        end: to.value,
      }).map((value) => ({
        value,
        display: format.value(value),
        key: format.value(value),
        selected: props.selected && isSameMonth(props.selected, value),
        disabled: !isEnabled(value, props.lowerLimit, props.upperLimit),
      })),
    );

    const heading = computed(() => getYear(from.value));
    const leftDisabled = computed(
      () =>
        props.lowerLimit &&
        (isSameYear(props.lowerLimit, props.pageDate) ||
          isBefore(props.pageDate, props.lowerLimit)),
    );
    const rightDisabled = computed(
      () =>
        props.upperLimit &&
        (isSameYear(props.upperLimit, props.pageDate) || isAfter(props.pageDate, props.upperLimit)),
    );

    const previousPage = () => emit("update:pageDate", subYears(props.pageDate, 1));
    const nextPage = () => emit("update:pageDate", addYears(props.pageDate, 1));

    return {
      months,
      heading,
      leftDisabled,
      rightDisabled,
      previousPage,
      nextPage,
    };
  },
});
</script>
