import { reactive, toRefs } from "vue";
import { storage } from "~/logic";

const lStorage = storage();
import { storageItems } from "~/shared/constants";

const { MENU_SETTINGS } = storageItems;

interface MenuState {
  showDevComponents: boolean;
  showProjects: boolean;
  showTasks: boolean;
  showCalendar: boolean;
  showAddressBook: boolean;
  showCompanyStructure: boolean;
  showFaq: boolean;
  showPersonalCard: boolean;
}

interface State {
  menu: MenuState;
}

const state = reactive<State>({
  menu: lStorage.getItem(MENU_SETTINGS) || {
    showProjects: true,
    showTasks: true,
    showPersonalCard: true,
    showCalendar: true,
    showAddressBook: true,
    showCompanyStructure: true,
    showFaq: true,
    showDevComponents: false,
  },
});

export function settingsModule() {
  function toggleToggleMenuSettings(value: MenuState): void {
    lStorage.setItem(MENU_SETTINGS, JSON.stringify(value));
    state.menu = value;
  }

  return {
    toggleToggleMenuSettings,
    ...toRefs(state),
  };
}
