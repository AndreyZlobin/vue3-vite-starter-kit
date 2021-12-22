<template>
  <section>
    <h3 class="title-lg">Отображение меню</h3>
    <v-switcher
      v-model="menuSettings.showProjects"
      :value="menuSettings.showProjects"
      class="mb-2"
      title="Отображать проекты"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showTasks"
      :value="menuSettings.showTasks"
      class="mb-2"
      title="Отображать задачи"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showPersonalCard"
      :value="menuSettings.showPersonalCard"
      class="mb-2"
      title="Отображать личную карту"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showCalendar"
      :value="menuSettings.showCalendar"
      class="mb-2"
      title="Отображать календарь событий"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showAddressBook"
      :value="menuSettings.showAddressBook"
      class="mb-2"
      title="Отображать адресную книгу"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showFaq"
      :value="menuSettings.showFaq"
      class="mb-2"
      title="Отображать часто задаваемые вопросы"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showCompanyStructure"
      :value="menuSettings.showCompanyStructure"
      class="mb-2"
      title="Отображать структуру компании"
      @on-change="handlerToggleMenuSettings"
    />
    <v-switcher
      v-model="menuSettings.showDevComponents"
      :value="menuSettings.showDevComponents"
      class="mb-2"
      title="Отображать DEV компоненты"
      @on-change="handlerToggleMenuSettings"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from "vue";
import { settingsModule } from "~/core/store/settings.module";
import VSwitcher from "~/components/ui/v-switcher/index.vue";

export default defineComponent({
  name: "MenuSettings",
  components: { VSwitcher },
  setup() {
    const { menu, toggleToggleMenuSettings } = settingsModule();

    const menuSettings = reactive({ ...menu.value });

    async function handlerToggleMenuSettings(): Promise<void> {
      await nextTick();
      toggleToggleMenuSettings(menuSettings);
    }

    return {
      menuSettings,
      handlerToggleMenuSettings,
    };
  },
});
</script>
