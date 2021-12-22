<template>
  <div class="pt-2 transition-all duration-200">
    <v-menu-item v-for="item in menuList" :key="item.path" :item="item" :collapsed="collapsed" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import IconDashboard from "virtual:vite-icons/carbon/dashboard";
import IconChart from "virtual:vite-icons/carbon/chart-custom";
import IconUserCertification from "virtual:vite-icons/carbon/user-certification";
import IconCalendar from "virtual:vite-icons/carbon/calendar-heat-map";
import IconNotebook from "virtual:vite-icons/carbon/notebook";
import IconDataCenter from "virtual:vite-icons/carbon/data-center";
import IconSettings from "virtual:vite-icons/carbon/settings";
import IconCube from "virtual:vite-icons/carbon/cube";
import IconQuery from "virtual:vite-icons/carbon/query";
import VMenuItem from "~/components/ui/v-menu/v-menu-item.vue";
import { MenuItem } from "~/types";
import { settingsModule } from "~/core/store/settings.module";
export default defineComponent({
  name: "VMenu",
  components: { VMenuItem },
  props: {
    collapsed: { type: Boolean as PropType<boolean>, required: true },
  },
  setup() {
    const { menu } = settingsModule();
    const menuList = computed<MenuItem[]>(() =>
      [
        { title: "Все проекты", path: "/", icon: IconDashboard, show: menu.value.showProjects },
        { title: "Задачи", path: "/tasks", icon: IconChart, show: menu.value.showTasks },
        {
          title: "Личная карта",
          path: "/",
          icon: IconUserCertification,
          show: menu.value.showPersonalCard,
        },
        {
          title: "Календарь событий",
          path: "/",
          icon: IconCalendar,
          show: menu.value.showCalendar,
        },
        {
          title: "Адресная книга",
          path: "/",
          icon: IconNotebook,
          show: menu.value.showAddressBook,
        },
        {
          title: "Структура компании",
          path: "/",
          icon: IconDataCenter,
          show: menu.value.showCompanyStructure,
        },
        {
          title: "Часто задаваемые вопросы",
          path: "/",
          icon: IconQuery,
          show: menu.value.showFaq,
        },
        {
          title: "Настройки",
          path: "/",
          icon: IconSettings,
          animation: "group-hover:animate-spin",
        },
        {
          title: "[DEV] Компоненты",
          path: "/",
          icon: IconCube,
          show: menu.value.showDevComponents,
        },
      ].filter((item) => item.show ?? true),
    );
    return {
      menuList,
    };
  },
});
</script>
