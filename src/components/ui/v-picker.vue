<template>
  <div v-click-outside="handlerHidePicker" class="v-picker__wrapper">
    <div class="v-picker__control">
      <label
        v-if="Boolean(title)"
        class="v-picker__title"
        :class="{ 'v-picker__title--transform': Boolean(date) }"
      >
        {{ title }}
      </label>
      <input
        ref="input"
        type="text"
        class="v-picker__field"
        readonly
        :value="!date ? '' : inputValue"
        @input="handlerInput"
        @keyup.enter="handleChangeInput"
        @blur="handleChangeInput"
        @focus="navigationFocus"
        @keyup.down="handlerKeyDown"
        @keyup.up="handlerKeyUp"
      />
    </div>
    <section v-if="focus" ref="picker" class="v-picker">
      <div class="v-picker__navigation">
        <span class="mr-5" @click="handlerPrevYear"> -- </span>
        <span class="mr-5" @click="handlerPrevMonth"> - </span>
        <span class="mr-3">
          {{ currentMonthName }}
        </span>
        <span class="mr-3">
          {{ rootValue.getFullYear() }}
        </span>
        <span class="mr-5" @click="handlerNextMonth"> + </span>
        <span class="mr-5" @click="handlerNextYear"> ++ </span>
      </div>
      <div class="v-picker__weekdays">
        <div
          v-for="(wd, index) in weekDays"
          :key="`wd-${index}`"
          class="v-picker__weekday"
          :class="{ 'v-picker__weekend': index === 5 || index === 6 }"
        >
          <span>{{ wd }}</span>
        </div>
      </div>
      <div class="v-picker-month__list">
        <div
          v-for="d in paddingStartDays"
          :key="`day-prev-${d}`"
          :class="{ range: isDateInRange(d) }"
          class="v-picker-month__day day-prev-month"
        >
          <div class="v-picker-month__title">
            <span @click="handleSelectDate(d)">{{ d.getDate() }}</span>
          </div>
        </div>
        <div
          v-for="(d, index) in daysInMonthList"
          :key="d.getTime()"
          class="v-picker-month__day day-now-month"
          :class="{ range: isDateInRange(d) }"
          @mousemove="handlerMousemove(d)"
          @keydown.down="handlerKeyDown(index, d)"
          @keydown.up="handlerKeyUp(index, d)"
          @keydown.right="handlerKeyRight(index, d)"
          @keydown.left="handlerKeyLeft(index, d)"
        >
          <div class="v-picker-month__title">
            <span
              :ref="setItemRef"
              tabindex="0"
              :data-index="d.getDate()"
              :class="{
                now: isNow(d.getDate()),
                selected: isSelectedMonth(d),
                'rage-mark': isDateRangeStartAndEnd(d),
              }"
              @click="handleDateClick(d)"
            >
              {{ d.getDate() }}
            </span>
          </div>
        </div>
        <div
          v-for="d in paddingFinishDays"
          :key="`day-next-${d}`"
          class="v-picker-month__day day-next-month"
          :class="{ range: isDateInRange(d) }"
          @mousemove="handlerMousemove(d)"
        >
          <div class="v-picker-month__title">
            <span :class="{ 'rage-mark': isDateRangeStartAndEnd(d) }" @click="handleDateClick(d)">
              {{ d.getDate() }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  getMonth,
  isLeapYear,
  getYear,
  paddingFirstDayInMonth,
  isNow,
  getDaysInMonth,
  getDateWithFormat,
  mapOfDate,
  subtractDays,
  addDays,
  getDatesBetweenToDates,
  getStringDate,
  getDate,
  DateType,
  DateMaskFormat,
  FormatType,
  MONTH_DAY_LEAP,
  MONTH_DAY,
  SHORT_WEEK_DAYS,
  MONTHS,
  addYears,
  subtractYears,
  addMonth,
  subtractMonth,
} from "~/utils";
import { Component, PropType } from "vue";

interface Data {
  weekDays: string[];
  focus: boolean;
  itemRefs: HTMLElement[];
  shadowDate: Date;
  disabledRange: boolean;
  rangeDates: DateType[];
}

type DateProps = DateType | null;
export default {
  name: "VPicker",
  props: {
    date: {
      type: [String, Number, Date, null] as PropType<DateProps>,
      required: true,
    },
    format: {
      type: String as PropType<DateMaskFormat>,
      default: "YYYY-MM-DD",
      validator: (v: DateMaskFormat) => ["YYYY-MM-DD", "YYYY-DD-MM"].includes(v),
    },
    returnFormat: {
      type: String as PropType<FormatType>,
      default: "date",
      validator: (v: FormatType) => ["unix", "date", "format"].includes(v),
    },
    title: { type: String as PropType<string>, default: "" },
    closeOutside: { type: Boolean as PropType<boolean>, default: true },
    range: { type: Boolean as PropType<boolean>, default: false },
  },
  emits: {
    "update:date": null,
  },
  data(): Data {
    return {
      weekDays: SHORT_WEEK_DAYS,
      focus: false,
      itemRefs: [],
      shadowDate: this.rootValue,
      disabledRange: true,
      rangeDates: [],
    };
  },
  computed: {
    refsControls(): HTMLElement[] {
      return this.itemRefs;
    },
    rootValue(): Date {
      return new Date(this.date || Date.now());
    },
    rangeInputValue(): string {
      const start = this.rangeDates?.[0]
        ? getDateWithFormat(this.rangeDates?.[0], this.format)
        : "";
      const end = this.rangeDates?.[1] ? getDateWithFormat(this.rangeDates?.[1], this.format) : "";
      return start || end ? `${start || ""} ~ ${end || ""}` : "";
    },
    inputValue(): string {
      if (this.range) return this.rangeInputValue;
      return getDateWithFormat(this.rootValue, this.format);
    },
    currentMonthName(): string {
      const index = this.rootValue.getMonth();
      return MONTHS[index];
    },
    daysInMonthList(): Date[] {
      const date = new Date(this.rootValue);
      return getDaysInMonth(date.getMonth(), date.getFullYear());
    },
    daysInMonth(): number {
      return this.daysList[getMonth(this.rootValue)];
    },
    daysInPrevMonth(): number {
      return this.daysList[getMonth(this.rootValue) === 0 ? 11 : getMonth(this.rootValue) - 1];
    },
    daysList(): number[] {
      const isLeap = isLeapYear(getYear(this.rootValue));
      return isLeap ? MONTH_DAY_LEAP : MONTH_DAY;
    },
    paddingStartDays(): Date[] {
      const total = paddingFirstDayInMonth(getYear(this.rootValue), getMonth(this.rootValue));
      const date = subtractDays(this.daysInMonthList[0]?.getTime(), total);
      return getDatesBetweenToDates(date, this.daysInMonthList[0]?.getTime());
    },
    paddingFinishDays(): Date[] {
      const total = 42 - (this.paddingStartDays.length + this.daysInMonth);
      const date = addDays(
        this.daysInMonthList[this.daysInMonthList.length - 1]?.getTime(),
        total + 1,
      );
      const startDate = new Date(
        addDays(this.daysInMonthList[this.daysInMonthList.length - 1], 1),
      ).getTime();
      return getDatesBetweenToDates(startDate, date);
    },
    countGrid(): number {
      return this.paddingStartDays.length + this.daysInMonth + this.paddingFinishDays.length;
    },
  },
  watch: {
    rootValue: {
      handler(value: Date) {
        this.shadowDate = value;
      },
      immediate: true,
    },
  },
  mounted(): void {
    document.addEventListener("keydown", this.documentKeydownCb);
  },
  beforeUnmount(): void {
    document.removeEventListener("keydown", this.documentKeydownCb);
  },
  errorCaptured(err: Error, instance: Component, info: string): void {
    console.warn({ message: err?.message || "[Error]", locale: instance, info });
  },
  beforeUpdate(): void {
    this.itemRefs = [];
  },
  methods: {
    setItemRef(el: HTMLElement) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    documentKeydownCb(event: KeyboardEvent): void {
      if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      }
    },
    async handlerKeyDown(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index + 7;
      this.handleSelectDate(addDays(date.getTime(), 7));
      if (id < length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyUp(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index - 7;
      this.handleSelectDate(subtractDays(date.getTime(), 7));
      const total = length - id;
      if (total <= length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyRight(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index + 1;
      this.handleSelectDate(addDays(date.getTime(), 1));
      if (id < length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyLeft(index: number | Event, date: Date): Promise<void> {
      let id = typeof index !== "number" ? 0 : index - 1;
      this.handleSelectDate(subtractDays(date.getTime(), 1));
      if (id >= 0) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    handlerMousemove(d: Date): void {
      if (!this.disabledRange && this.rangeDates?.[0]?.getTime() !== d.getTime()) {
        this.rangeDates[1] = d;
      }
    },
    handlerNextYear(): void {
      this.handleSelectDate(addYears(this.rootValue, 1));
    },
    handlerPrevYear(): void {
      this.handleSelectDate(subtractYears(this.rootValue, 1));
    },
    handlerNextMonth(): void {
      this.handleSelectDate(addMonth(this.rootValue, 1));
    },
    handlerPrevMonth(): void {
      this.handleSelectDate(subtractMonth(this.rootValue, 1));
    },
    handlerInput(event: InputEvent): void {
      event.preventDefault();
    },
    handlerHidePicker(): void {
      if (!this.closeOutside) return;
      this.focus = false;
    },
    handleChangeInput(event: KeyboardEvent): void {
      const value = (event.target as HTMLInputElement).value;
      this.handleSelectDate(value);
    },
    async navigationFocus(): Promise<void> {
      this.focus = false;
      await this.$nextTick();
      await this.onFocus();
    },
    async onFocus(): Promise<void> {
      this.focus = true;
      this.$refs.input.focus();
      await this.$nextTick();
      const startDate = getDate(this.rootValue);
      await this.$nextTick();
      this.itemRefs[startDate - 1]?.focus();
    },

    handleDateClick(d: DateType): void {
      if (this.range) {
        this.resetRangeDates();
        this.disabledRange = false;
        if (!this.rangeDates.length) {
          this.rangeDates.push(d);
        }
        if (this.rangeDates.length === 2) {
          this.disabledRange = true;
        }
      }
      this.handleSelectDate(d);
    },
    handleSelectDate(d: DateType): void {
      const key: FormatType = this.returnFormat;
      if (!d) return;
      // {
      // this.$emit("update:date", d);
      // return;
      // }
      const result = mapOfDate(d, this.format)[key];
      this.$emit("update:date", result);
    },
    resetRangeDates(): void {
      if (this.rangeDates.length === 2 && this.disabledRange) {
        this.rangeDates = [];
      }
    },
    isNow(d: number): boolean {
      return isNow(d, this.rootValue) && !this.rangeDates.length;
    },
    isDateRangeStartAndEnd(d: Date): boolean {
      if (this.rangeDates.length === 2) {
        const item = d.getTime();
        const start = this.rangeDates[0].getTime();
        const end = this.rangeDates[1].getTime();
        return item === start || item === end;
      }
      return false;
    },
    isDateInRange(d: Date): boolean {
      if (this.rangeDates.length === 2) {
        const item = d.getTime();
        const start = this.rangeDates[0].getTime();
        const end = this.rangeDates[1].getTime();
        return item >= start && item <= end;
      }
      return false;
    },
    isSelectedMonth(d: Date): boolean {
      return getStringDate(this.rootValue) === getStringDate(d) && !this.rangeDates.length;
    },
  },
};
</script>
<style lang="scss" scoped>
$amelie: #ffffff;
$arrival: #e4edfb;
$rocky: #3d75e4;
$fargo: #e14761;
$titanic: #04153e;

.v-picker__wrapper {
  display: inline-flex;
  position: relative;
}

.v-picker__navigation {
  display: flex;
}

.v-picker__control {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  background-color: rgba(61, 117, 228, 0.08);
  border-radius: 8px;
  cursor: text;
}

.v-picker__field {
  background: transparent;
  border: none;
  outline: none;
  margin-top: 10px;
}

.v-picker__title {
  position: absolute;
  cursor: text;
  white-space: nowrap;
  z-index: 2;
  color: $titanic;
  opacity: 0.48;
  transition: all 0.2s ease;
  left: 16px;
  top: 15px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 20px;
  transform: translateY(-6px);
  pointer-events: none;

  &--transform {
    top: 15px;
    transform: translateY(-14px);
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
  }
}

.v-picker {
  z-index: 100;
  position: absolute;
  top: 45px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 288px;
  padding: 24px;
  box-shadow: 0 8px 24px rgb(19 57 134 / 16%);
  border-radius: 16px;
  background-color: $amelie;

  &__weekdays {
    width: 100%;
    display: flex;
  }

  &__weekday {
    color: $rocky;
    width: calc(100% / 7);
    text-align: center;
    font-size: 10px;
    line-height: 12px;

    &:last-child {
      border: none;
    }
  }

  &__weekend {
    color: $fargo;
  }

  &-month__list {
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }

  &-month__day {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% / 7);

    &.day-prev-month,
    &.day-next-month {
      opacity: 0.48;
    }

    &.range {
      background-color: rgba($rocky, 0.5);
      color: $arrival;
    }
  }

  &-month__title {
    width: 100%;
    padding: 2px;
    display: flex;
    justify-content: center;

    & > span {
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      cursor: pointer;

      &:focus {
        border: none;
        outline: none;
        background-color: rgba($rocky, 0.8);
        color: $arrival;
        opacity: 1;
      }

      &:hover {
        background-color: rgba($rocky, 0.8);
        color: $arrival;
        opacity: 1;
      }

      &.now {
        border: 1px solid $rocky;
      }

      &.selected {
        background-color: $rocky;
        color: $arrival;
      }

      &.rage-mark {
        background-color: $rocky;
        color: $arrival;
      }
    }
  }
}
</style>
