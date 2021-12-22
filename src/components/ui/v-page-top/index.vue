<template>
  <header class="flex items-center justify-between pr-5">
    <div>
      <h1 class="title-big mb-0">{{ pageName }}</h1>
    </div>
    <div class="flex-1"></div>
    <div class="flex items-center flex-2">
      <div class="relative" @click="handlerShowNotification">
        <v-icon name="bell" class="mr-7 cursor-pointer" height="20" width="20" />
        <span
          v-if="notifications.length"
          class="
            absolute
            -top-2
            right-5
            h-4
            w-4
            text-xs text-white-400
            rounded-full
            bg-red-400
            select-none
            flex
            items-center
            justify-center
            cursor-pointer
            animate-pulse
          "
          >{{ notifications.length }}</span
        >
      </div>
      <div class="flex items-center cursor-pointer" @click="handlerClickToPersonalCard">
        <v-avatar :username="username?.nameAndLastname" class="!h-10 !w-10 text-xl" />
        <span class="w-10 font-semibold leading-tight">
          {{ username?.nameAndLastname }}
        </span>
      </div>
      <side-modal v-model:toggle="showNotificationModal" :show="showNotificationModal" overlay>
        <template #header>
          <h3 class="title-lg">Уведомления</h3>
        </template>
        <notifications-list :notifications="notifications" @on-read="handleReadNoty" />
      </side-modal>
    </div>
  </header>
</template>

<script lang="ts">
import VIcon from "~/components/ui/v-icon/index.vue";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { PERSONAL_USER_CARD_PATHS } from "~/shared/constants/routes-paths";
import { userModule } from "~/core/store/user.module";
import VAvatar from "~/components/ui/v-avatar.vue";
import { concatUsername } from "~/utils";
import { $socket } from "~/core/api/io";
import SideModal from "~/components/shared/modals/side-modal.vue";
import NotificationsList from "~/components/shared/notifications/notifications-list.vue";
import { fetchNotification, readNotification } from "~/shared/requests/notifications.requests";
import { NOTIFICATIONS_ENDPOINTS } from "~/core/api/endpoints";
import { Notification } from "~/types";
const { getNotificationIo } = NOTIFICATIONS_ENDPOINTS;
export default defineComponent({
  name: "VPageTop",
  components: { NotificationsList, SideModal, VAvatar, VIcon },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { user } = userModule();
    const pageName = ref("");
    const showNotificationModal = ref(false);
    const notifications = ref<Notification[]>([]);

    onMounted(async () => {
      await fetchAllNotifications();
      user.value &&
        $socket.on<Notification>(getNotificationIo(user.value.id), (noty) => {
          notifications.value.unshift(noty);
        });
    });

    async function fetchAllNotifications() {
      if (user.value) {
        const res = await fetchNotification(user.value.id);
        if (res) {
          notifications.value = res.data;
        }
      }
    }

    async function handleReadNoty(id: number): Promise<void> {
      await readNotification(id);
      notifications.value = notifications.value.filter((noty) => noty.id !== id);
    }

    function handlerShowNotification(): void {
      showNotificationModal.value = true;
    }

    function handlerClickToPersonalCard(): void {
      router.push(PERSONAL_USER_CARD_PATHS.BASE);
    }

    const username = computed(() => user.value && concatUsername(user.value.fio));
    watch(
      () => route,
      (routeValue: RouteLocationNormalizedLoaded): void => {
        pageName.value = routeValue.name as string;
      },
      {
        deep: true,
        immediate: true,
      },
    );
    return {
      pageName,
      user,
      handlerClickToPersonalCard,
      handlerShowNotification,
      handleReadNoty,
      username,
      notifications,
      showNotificationModal,
    };
  },
});
</script>
