<template>
  <div>
    <h1>autoComplete</h1>
    <input v-bind="$attrs" ref="input" type="text" :value="modelValue" @input="handlerInput" />
    <v-loader v-if="!readyItems.length" />
    <div v-else-if="!fetchingData.length">Данных нет</div>
    <ul v-else>
      <li v-for="item in readyItems" :key="item[idValue]">{{ item[titleValue] }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import VLoader from "~/components/ui/v-loader/index.vue";

export default defineComponent({
  name: "VAutocomplete",
  components: { VLoader },
  props: {
    requestUrl: {
      type: String as PropType<string>,
      required: true,
    },
    idValue: {
      type: String as PropType<string>,
      default: "id",
    },
    titleValue: {
      type: String as PropType<string>,
      default: "title",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    delay: {
      type: Number as PropType<number>,
      default: 300,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const input = ref<null | HTMLInputElement>(null);
    const fetchingData = ref([]);
    const loading = ref(false);
    function emitValue(value: string): void {
      emit("update:modelValue", value);
    }
    const readyItems = computed(() => {
      return !loading.value && fetchingData.value.length ? fetchingData.value : [];
    });
    function handlerInput(event: Event): void {
      const { value } = event.target as HTMLInputElement;
      emitValue(value);
      loading.value = true;
      fetch(props.requestUrl)
        .then((res) => res.json())
        .then((res) => {
          fetchingData.value = res;
          loading.value = false;
          // loading.value = true;
        });
    }

    function clearValues(): void {
      emitValue("");
      fetchingData.value = [];
      if (input.value) {
        (input.value as HTMLInputElement).value = "";
      }
    }

    return {
      input,
      loading,
      fetchingData,
      readyItems,
      handlerInput,
    };
  },
});
</script>
