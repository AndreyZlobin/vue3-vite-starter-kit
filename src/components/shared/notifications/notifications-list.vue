<template>
  <section>
    <transition-group name="list">
      <notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @on-read="handleReadNoty"
      />
    </transition-group>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Notification as Noty } from "~/types";
import Notification from "~/components/shared/notifications/notification.vue";

export default defineComponent({
  name: "NotificationsList",
  components: { Notification },
  props: {
    notifications: {
      type: Array as PropType<Noty[]>,
      required: true,
    },
  },
  emits: {
    "on-read"(value: number): boolean {
      return true;
    },
  },
  setup(_, { emit }) {
    function handleReadNoty(id: number): void {
      emit("on-read", id);
    }
    return { handleReadNoty };
  },
});
</script>
