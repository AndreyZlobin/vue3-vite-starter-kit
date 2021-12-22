<template>
  <div class="container mx-auto py-5 p-4">
    <v-icon name="500" height="200" width="300" class="mx-auto mb-10" />
    <h1 class="title-big text-center mb-20">{{ message }}</h1>
    <div class="flex flex-col justify-center items-center">
      <v-button class="mb-5 w-50" text="Вернуться на главную" @click="$router.push('/')"></v-button>
      <v-button class="w-50" type="blue" text="Вернуться назад" @click="$router.go(-1)"></v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import VButton from "~/components/ui/v-button/index.vue";
import VIcon from "~/components/ui/v-icon/index.vue";

export default defineComponent({
  name: "ErrorPage",
  components: { VIcon, VButton },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { message } = route.query;
    if (!message) {
      router.push("/");
    }
    return {
      message,
    };
  },
});
</script>
