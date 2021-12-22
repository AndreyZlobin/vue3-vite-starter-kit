<template>
  <div
    class="p-12 bg-gray-100 border border-gray-300"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <input
      id="assetsFieldHandle"
      ref="file"
      type="file"
      multiple
      name="fields[assetsFieldHandle][]"
      class="w-px h-px opacity-0 overflow-hidden absolute"
      accept=".pdf,.jpg,.jpeg,.png"
      @change="onChange"
    />

    <label for="assetsFieldHandle" class="block cursor-pointer">
      <div>
        Перетащите сюда или
        <span class="underline">нажмите</span> чтобы загрузить файлы
      </div>
    </label>
    <ul v-if="fileList.length" v-cloak class="mt-4">
      <li v-for="(file, index) in fileList" :key="file.name" class="text-sm p-1">
        {{ file.name }}
        <button class="ml-2" type="button" title="Remove file" @click="remove(index)">
          remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VFileUploader",
  data() {
    return {
      fileList: [], // Store our uploaded files
    };
  },
  methods: {
    onChange() {
      this.fileList = [...this.$refs.file.files];
    },
    remove(i: number) {
      this.fileList.splice(i, 1);
    },
    cleanUpClasses(el: HTMLElement) {
      el.classList.remove("bg-gray-100");
      el.classList.add("bg-green-300");
    },
    dragover(event: Event) {
      event.preventDefault();
      const el = event.currentTarget as HTMLInputElement;
      if (!el.classList.contains("bg-green-300")) {
        this.cleanUpClasses(el);
      }
    },
    dragleave(event: Event) {
      const el = event.currentTarget as HTMLInputElement;
      this.cleanUpClasses(el);
    },
    drop(event: DragEvent) {
      const el = event.currentTarget as HTMLInputElement;
      event.preventDefault();
      if (event.dataTransfer) {
        this.$refs.file.files = event.dataTransfer.files;
        this.onChange(); // Trigger the onChange event manually
        this.cleanUpClasses(el);
      }
    },
  },
});
</script>
