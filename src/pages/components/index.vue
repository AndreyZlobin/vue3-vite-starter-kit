<template>
  <div>
    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Кнопки</h3>
      <section class="flex items-center">
        <v-button class="mr-2" text="Кнопка обычная">
          <v-icon name="add" class="mr-2" height="16" width="16" />
        </v-button>
        <v-button class="mr-2" type="danger" text="Кнопка красная" />
        <v-button class="mr-2" type="base" text="Кнопка неактивна" disabled />
        <v-button class="mr-2" type="green" text="Кнопка зеленая" />
        <v-button class="mr-2" type="blue">
          <v-icon name="add" />
        </v-button>
        <v-button class="mr-2" type="blue" text="Кнопка светло-синяя"></v-button>
        <v-button-text text="Какое-то действие" icon="add" class="mr-2" />
        <v-button
          class="mr-2"
          type="base"
          text="Кнопка с задержкой"
          :delay="500"
          @click="handleDelayClick"
        />
        <v-button class="mr-2" text="Кнопка в состоянии загрузки" loading />
      </section>
    </div>

    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Алерты</h3>
      <section class="flex items-center">
        <v-button class="mr-2" text="Успешно" @click="toast.success('Успешно')" />
        <v-button class="mr-2" type="danger" text="Ошибка" @click="toast.error('Ошибка')" />
        <v-button class="mr-2" text="Предупреждение" @click="toast.warn('Предупреждение')" />
        <v-button class="mr-2" text="Информативная" @click="toast.info('Информативная')" />
        <v-popover position="top" tooltip-text="top" class="mr-4">
          <button>top</button>
        </v-popover>

        <v-popover position="right" tooltip-text="right">
          <button>right</button>
        </v-popover>
        <v-pop position="bottom-center" content-width-activator>
          <template #activator="{ on }">
            <v-button class="mr-2" text="Успешно" v-on="on" />
          </template>
          <template #default> default </template>
        </v-pop>
      </section>
    </div>

    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Модалки</h3>
      <section class="flex">
        <v-button class="mr-2" text="Модалка справа" @click="showModal = true" />
        <side-modal v-model:toggle="showModal" :show="showModal" overlay>
          <template #header>
            <p class="text-red-500">header slot</p>
          </template>
          <p class="text-blue-500">body slot</p>
          <template #footer>
            <p>body slot</p>
            <section class="flex items-center justify-end">
              <v-button class="mr-2" type="danger" text="Отменить" />
              <v-button class="mr-2" text="Подтвердить" />
            </section>
          </template>
        </side-modal>
        <v-button class="mr-2" text="Модалка полный экран" @click="showModalFull = true" />
        <side-modal v-model:toggle="showModalFull" :show="showModalFull" overlay fullscreen>
        </side-modal>
      </section>
    </div>

    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Элементы форм</h3>
      <v-form class="flex items-center" @on-submit="submitForm">
        <div class="mr-3">
          <div class="mb-5 flex">
            <v-input
              v-model="textInputValue"
              class="mr-5"
              placeholder="Текстовый инпут"
              :rules="textInputValidators"
              :value="textInputValue"
            />
            <pre>{{ JSON.stringify(textInputValue, null, 2) }}</pre>
          </div>
          <div class="mb-5 flex">
            <v-input
              class="mr-5"
              :rules="textInputDebounceValidators"
              placeholder="Текстовый инпут с задержкой"
              :delay="300"
              :value="debounceInputValue"
              @input="handlerInputChange"
            />
            <pre>{{ JSON.stringify(debounceInputValue, null, 2) }}</pre>
          </div>
          <div class="mb-5 flex">
            <picker
              v-model:date="date"
              class="mr-5"
              :date="date"
              return-format="date"
              title="Выбор даты"
            />
            <pre>{{ JSON.stringify(date, null, 2) }}</pre>
          </div>
          <div class="mb-5 flex">
            <v-select
              v-model="select.value"
              class="mr-5"
              id-value="id"
              text-value="title"
              :rules="textInputDebounceValidators"
              :placeholder="select.placeholder"
              :value="select.value"
              :options="select.options"
            />
            <pre>{{ JSON.stringify(select.value, null) }}</pre>
          </div>
          <div class="mb-5 flex">
            <v-autocomplete
              v-model="autoCompleteValue"
              class="mr-5"
              id-value="id"
              :delay="300"
              title-value="name"
              :request-url="getCompanies"
            />
            <pre>{{ JSON.stringify(autoCompleteValue, null) }}</pre>
          </div>
          <div class="mb-5 flex">
            <v-checkbox v-model="checkboxValue" class="mr-5" title="title" :value="checkboxValue" />
            <pre>{{ JSON.stringify(checkboxValue, null, 2) }}</pre>
          </div>

          <div class="mb-5 flex">
            <v-switcher v-model="checkboxSwitchValue" class="mr-5" :value="checkboxSwitchValue" />
            <pre>{{ JSON.stringify(checkboxSwitchValue, null, 2) }}</pre>
          </div>
          <div class="mb-5 flex">
            <v-file-uploader />
          </div>
        </div>
        <v-button class="mr-2" text="Отправить форму" />
      </v-form>
    </div>

    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Таблица</h3>
      <section class="flex items-center">
        <v-table :loading="tableLoading" :columns="columns" :items="[]" />
      </section>
      <v-button
        class="mr-2"
        text="Переключить состояние загрузки таблицы"
        @click="tableLoading = !tableLoading"
      />
    </div>
    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Загрузка</h3>
      <section class="flex items-center">
        <v-loader class="mr-3" />
        <v-spinner />
      </section>
    </div>

    <div class="border-b-1 p-2 text-lg mb-10">
      <h3 class="mb-4">Табы</h3>
      <section class="flex items-center">
        <tabs v-model="activeTab">
          <tab title="Профиль">Профиль</tab>
          <tab title="Оповещения">Оповещения</tab>
          <tab title="Квотирование">Квотирование</tab>
          <tab title="Настройки">Настройки</tab>
        </tabs>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import VButton from "~/components/ui/v-button/index.vue";
import SideModal from "~/components/shared/modals/side-modal.vue";
import VInput from "~/components/ui/v-input/index.vue";
import VTable from "~/components/ui/v-table/index.vue";
import VLoader from "~/components/ui/v-loader/index.vue";
import VSpinner from "~/components/ui/v-spinner/index.vue";
import VSelect from "~/components/ui/v-select/index.vue";
import { toast } from "~/utils/toast";
import Tabs from "~/components/ui/v-tabs/Tabs.vue";
import Tab from "~/components/ui/v-tabs/Tab.vue";
import VButtonText from "~/components/ui/v-button/v-button-text.vue";
import VIcon from "~/components/ui/v-icon/index.vue";
import picker from "~/components/ui/v-picker.vue";
import VCheckbox from "~/components/ui/v-checkbox/index.vue";
import VSwitcher from "~/components/ui/v-switcher/index.vue";
import VAutocomplete from "~/components/ui/v-autocomplete/index.vue";
import VFileUploader from "~/components/ui/v-file-uploader/index.vue";
import { BASE_API_URL } from "~/shared/constants";
import VForm from "~/components/ui/v-form/index.vue";
import { validators } from "~/shared/hooks/validator/rules";
import VPopover from "~/components/ui/v-popover/index.vue";
import VPop from "~/components/ui/v-pop/index.vue";

const { required, email } = validators;
export default defineComponent({
  name: "Components",
  components: {
    VPop,
    VPopover,
    VForm,
    VFileUploader,
    VAutocomplete,
    VSwitcher,
    VCheckbox,
    picker,
    VIcon,
    VButtonText,
    Tab,
    Tabs,
    VSelect,
    VSpinner,
    VLoader,
    VInput,
    SideModal,
    VButton,
    VTable,
  },
  setup() {
    const textInputValue = ref("");
    const textInputValidators = reactive([{ rule: email, errorMessage: "Некорректный email" }]);
    const textInputDebounceValidators = reactive([
      { rule: required, errorMessage: "Обязательное поле" },
    ]);
    const tableLoading = ref(false);
    const showModal = ref(false);
    const showModalFull = ref(false);
    const checkboxValue = ref(true);
    const checkboxSwitchValue = ref(true);
    const debounceInputValue = ref("");
    const autoCompleteValue = ref("");
    const picked = ref(new Date());
    const date = ref(null);

    function handlerInputChange(value: string): void {
      debounceInputValue.value = value;
    }

    function submitForm(): void {
      toast.success("Форма отправлена");
    }

    const select = reactive({
      value: { id: "", title: "" },
      options: [
        { id: "1", title: "select-1", value: "value-1" },
        { id: "2", title: "select-3", value: "value-3" },
        { id: "3", title: "select-4", value: "value-4" },
        { id: "4", title: "select-5", value: "value-5" },
        { id: "5", title: "select-6", value: "value-6" },
        { id: "6", title: "select-7", value: "value-7" },
      ],
      placeholder: "Выберите значение",
    });

    return {
      tableLoading,
      showModal,
      showModalFull,
      textInputValue,
      textInputValidators,
      textInputDebounceValidators,
      select,
      debounceInputValue,
      autoCompleteValue,
      getCompanies: `${BASE_API_URL}companies`,
      handlerInputChange,
      submitForm,
      picked,
      date,
      checkboxValue,
      checkboxSwitchValue,
      toast,
      activeTab: ref(0),
      handleDelayClick: () => {
        alert("delay");
      },
      columns: [
        { title: "ID", dataId: "id" },
        { title: "First name", dataId: "nick" },
        { title: "Last name", dataId: "first" },
        { title: "Nick name", dataId: "last" },
      ],
    };
  },
});
</script>

<style scoped></style>
