<template>
  <div class="mb-3 bg-blue-100 p-2 flex rounded-2xl">
    <div class="flex-1 mr-2">
      <div class="flex items-center justify-between mb-2">
        <strong class="text-sm mr-1">{{ notification.title }}</strong>
        <div class="flex items-center cursor-pointer" @click="handleReadNoty">
          <v-icon name="eye" class="mr-2" />
          <p>Прочитано</p>
        </div>
      </div>
      <p class="text-sm" v-html="notification.body"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Notification } from "~/types";
import VIcon from "~/components/ui/v-icon/index.vue";

export default {
  name: "Notification",
  components: { VIcon },
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true,
    },
  },
  emits: {
    "on-read"(value: number): boolean {
      return true;
    },
  },
  setup(props, { emit }) {
    function handleReadNoty(): void {
      emit("on-read", props.notification.id);
    }
    return { handleReadNoty };
  },
};
</script>
