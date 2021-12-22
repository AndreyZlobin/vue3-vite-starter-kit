<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  inject,
  getCurrentInstance,
  defineComponent,
  onMounted,
  PropType,
  Ref,
  ComputedRef,
  ComponentInternalInstance,
} from "vue";

interface TabsState {
  tabs: Ref<ComponentInternalInstance[]>;
  active: ComputedRef<number>;
}

export default defineComponent({
  name: "Tab",
  props: {
    title: { type: String as PropType<string>, default: "", required: true },
  },
  setup() {
    const instance = getCurrentInstance();
    const { tabs, active } = inject("tabsState") as TabsState;

    const index = computed(() => tabs.value.findIndex((target) => target.uid === instance?.uid));
    const isActive = computed(() => index.value === active.value);

    onMounted(() => {
      if (index.value === -1 && instance) {
        tabs.value.push(instance);
      }
    });
    return {
      isActive,
    };
  },
});
</script>
