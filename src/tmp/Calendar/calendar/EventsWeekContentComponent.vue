<template>
  <section class="events">
    <div
      v-for="l in listDay"
      :key="l.object.id"
      class="events__event"
      :style="{
        backgroundColor: `var(--rir-${checkStartOrFinish(l).bg})`,
      }"
    >
      <div class="event__header">
        <rir-icon
          :fill="`${checkStartOrFinish(l).color}`"
          :icon="`${checkStartOrFinish(l).icon}`"
          size="16"
          class="mr-2"
        />
        <p
          class="events__title"
          :style="{
            color: `var(--rir-${checkStartOrFinish(l).color})`,
          }"
        >
          {{ l.object.type === 'task' ? 'Задача' : 'КС' }}
        </p>
      </div>
      <p
        class="event__text"
        :style="{
          color: `var(--rir-${checkStartOrFinish(l).color})`,
        }"
      >
        {{ l.object.title }}
      </p>
    </div>

  </section>
</template>

<script>

export default {
  name: 'events-week-content-component',
  // components: { RirIcon },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    day: {
      type: String,
      default: '',
    },
  },
  computed: {
    listDay() {
      return this.list.filter((el) => {
        const dayStart = new Date(el.dates.dateStart).setHours(0, 0, 0, 0);
        const dayFinish = new Date(el.dates.dateEnd).setHours(0, 0, 0, 0);
        return dayStart === this.dayColumn || dayFinish === this.dayColumn;
      });
    },
    dayColumn() {
      return new Date(this.day).setHours(0, 0, 0, 0);
    },
  },
  methods: {
    checkStartOrFinish(i) {
      const isDelay =
        (!!i.dates.dateFact && new Date(i.dates.dateFact) > new Date(i.dates.dateEnd)) ||
        (!i.dates.dateFact && new Date(i.dates.dateEnd) < Date.now());
      const isFact =
        i.dates.dateFact !== null &&
        new Date(i.dates.dateFact) < new Date(i.dates.dateEnd);
      if (i.object.type === 'task') {
        return {
          icon: isDelay ? 'in-progress' : isFact ? 'selected' : 'arrow-right',
          bg: isDelay ? 'romance' : isFact ? 'amadeus' : 'departed',
          color: isDelay ? 'fargo ' : isFact ? 'matrix' : 'gentlemen',
        };
      } else {
        return {
          icon: isDelay ? 'in-progress' : isFact ? 'selected' : 'arrow-left',
          bg: isDelay ? 'indiana' : isFact ? 'drive' : 'alien',
          color: 'rush',
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  &__event {
    position: relative;
    height: 105px;
    margin-top: 4px;
    width: 100%;
    overflow: hidden;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    color: var(--rir-amelie);
  }

  &__large {
    font-size: 13px;
    line-height: 16px;
    color: var(--rir-rocky);
    justify-self: flex-end;
  }
}

.event {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__icon {
    margin-right: 5px;
  }

  &__text,
  &__title {
    width: 100%;
    font-size: 10px;
    line-height: 12px;
    white-space: initial;
  }
}
</style>
