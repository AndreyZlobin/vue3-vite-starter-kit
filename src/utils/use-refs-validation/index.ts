import { Component, onUnmounted, ref } from "vue";

export function useRefsValidation() {
  const refs = ref<Array<() => void>>([]);
  onUnmounted(() => {
    refs.value = [];
  });
  const addRef = (el: Component & { validate: () => boolean }) => {
    if (el && el.validate && typeof el.validate === "function") {
      if (!refs.value.includes(el.validate)) {
        refs.value.push(el.validate);
      }
    }
  };

  return { refs, addRef };
}
