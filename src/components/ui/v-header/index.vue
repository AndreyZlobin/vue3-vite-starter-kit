<template>
  <header class="p-2 bg-blue-50">
    <div class="flex items-center py-2 px-8 bg-light-50">
      <div class="flex flex-shrink-0 items-center ml-auto">
        <div
          class="
            inline-flex
            items-center
            p-2
            hover:bg-gray-100
            focus:bg-gray-100
            rounded-lg
            cursor-pointer
          "
        >
          <div class="hidden mr-4 md:flex md:flex-col md:items-end md:leading-tight">
            <span class="font-semibold">Злобин Андрей</span>
            <span class="text-sm text-gray-600">Разработчик</span>
          </div>
          <v-avatar class="mb-0 !h-10 !w-10" classes="!h-10 !w-10" />
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="hidden sm:block h-6 w-6 text-gray-300"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <div class="border-l flex items-center pl-3 ml-3 space-x-1">
          <div
            class="
              relative
              p-2
              text-gray-400
              hover:bg-gray-100 hover:text-gray-600
              focus:bg-gray-100 focus:text-gray-600
              rounded-full
            "
          >
            <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
            <span
              class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"
            ></span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VAvatar from "~/components/ui/v-avatar.vue";
export default {
  name: "VHeader",
  components: { VAvatar },
};
</script>

<style scoped></style>
